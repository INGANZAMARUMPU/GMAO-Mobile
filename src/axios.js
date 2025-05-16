import axios from 'axios';
import store from './store';

axios.defaults.baseURL = '';

axios.interceptors.request.use(
  config => {
    if (!navigator.onLine) {
      store.commit('setOnline', false);
      return Promise.reject(new Error('Hors ligne'));
    }

    store.commit('setLoading', true);
    const token = store.state.user?.access;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    store.commit('setLoading', false);
    return response;
  },
  error => {
    store.commit('setLoading', false);
    return Promise.reject(error);
  }
);

export default axios;

import axios from 'axios';
import store from './assets/store'; 


axios.defaults.baseURL = 'https://gmao.amidev.bi/api/';


axios.interceptors.request.use(
  (config) => {
    if (!navigator.onLine) {
      store.state.online = false;
      return Promise.reject(new Error('Vous êtes hors ligne.'));
    }

    store.state.is_loading = true;

    const token = store.state.user?.access;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    store.state.is_loading = false;
    return Promise.reject(error);
  }
);

// Intercepteur de réponse
axios.interceptors.response.use(
  (response) => {
    store.state.is_loading = false;
    return response;
  },
  (error) => {
    store.state.is_loading = false;
    return Promise.reject(error);
  }
);

export default axios;

import { createStore } from 'vuex'
import Equipement from '../Rapport/equipement.vue'

const store = createStore({
  state() {
    return {
      plan: [],
      search_equipement: '',
      equipement_inventaire:[],
      PlanMaintance:[],
      Operation:[],
      code_inventaire: [],
      user: null,
      is_loading : false,
      static:[]

    }
  },

  mutations: {
    SET_SEARCH_EQUIPEMENT(state, value) {
      state.search_equipement = value
    }
  },

  getters: {
    getSearchEquipement(state) {
      return state.search_equipement
    }
  },
  setUser(state, user) {
    state.user = user;
  },
  setLoading(state, status) {
    state.is_loading = status;
  }

})

export default store

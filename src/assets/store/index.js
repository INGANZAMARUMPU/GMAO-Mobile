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
      is_loading : false,

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
  }
})

export default store

import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      plan: [],
      search_equipement: "",
      equipement_inventaire: [],
      PlanMaintance: [],
      Operation: [],
      code_inventaire: [],
      code_plan: [],
      user: null,
      is_loading: false,
      static: [],
      infrastructure_inventaire: [],
    };
  },

  mutations: {
    SET_SEARCH_EQUIPEMENT(state, value) {
      state.search_equipement = value;
    },
    clearStore() {
      state.plan = [];
      state.search_equipement = "";
      state.equipement_inventaire = [];
      state.PlanMaintance = [];
      state.Operation = [];
      state.code_inventaire = [];
      state.code_plan = [];
      state.static = [];
      state.infrastructure_inventaire = [];
      state.is_loading = false;
    },

    setUser(state, user) {
      state.user = user;

      if (user === null) {
        state.plan = [];
        state.search_equipement = "";
        state.equipement_inventaire = [];
        state.PlanMaintance = [];
        state.Operation = [];
        state.code_inventaire = [];
        state.code_plan = [];
        state.static = [];
        state.infrastructure_inventaire = [];
        state.is_loading = false;
      }
    },

    setLoading(state, status) {
      state.is_loading = status;
    },
  },

  getters: {
    getSearchEquipement(state) {
      return state.search_equipement;
    },
  },
});

export default store;

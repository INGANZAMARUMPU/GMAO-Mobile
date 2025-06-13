import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      plan: [],
      keyword: "",
      equipements: [],
      PlanMaintance: [],
      Operation: [],
      code_inventaire: [],
      code_plan: [],
      user: null,
      is_loading: false,
      static: [],
      infrastructures: [],
      choice: '',
      code: '',
      codeEqui: '',
      district: '',
      start_date: '',
      lieu:'',
      provinces: []
    };
  },

  mutations: {
    SET_keyword(state, value) {
      state.keyword = value;
    },
    setUser(state, user) {
      state.user = user;

      if (user === null) {
        state.plan = [];
        state.keyword = "";
        state.equipements = [];
        state.PlanMaintance = [];
        state.Operation = [];
        state.code_inventaire = [];
        state.code_plan = [];
        state.static = [];
        state.infrastructures = [];
        state.is_loading = false;
      }
    },

    setLoading(state, status) {
      state.is_loading = status;
    },
  },

  getters: {
    getSearchEquipement(state) {
      return state.keyword;
    },
  },
  setChoice(state, payload) {
    state.choice = payload;
  }
});

export default store;

export default {
  state: {
    register: false,
  },
  getters: {
    checkAccount(state) {
      return state.register;
    },
  },
  mutations: {
    goToRegister(state, data) {
      if (data) return (state.register = true);
      else return (state.register = false);
    },
  },
  actions: {},
};

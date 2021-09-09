export default {
  namespaced: true,

  state: {
    startLoading: false,
  },

  getters: {
    startLoading: (state) => state.startLoading,
  },
  mutations: {
    updateLoader(state, data) {
      state.startLoading = data;
    },
  },
  actions: {},
};

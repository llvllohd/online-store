import { HTTP } from "@/interceptor/interceptor.js";

let timer = "";

export default {
  namespaced: true,
  state: {
    authData: [],
  },
  getters: {
    authData: (state) => state.authData,
    token: (state) => (state.authData && state.authData.token ? state.authData.token : ""),
    isUserLoggedIn: (state) => (state.authData && state.authData.token ? true : false),
  },
  mutations: {
    setAuthData(state, data) {
      state.authData = data;
    },
  },
  actions: {
    register({ commit }, params) {
      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}register`, params)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setAuthData", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    login({ commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}login`, params)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              let expirationTime = +response.data.data.expires_in * 1000;
              timer = setTimeout(() => {
                dispatch("logout");
              }, expirationTime);
              commit("setAuthData", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}logout`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setAuthData", response.data.data);
              if (timer) {
                clearTimeout(timer);
              }
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
};

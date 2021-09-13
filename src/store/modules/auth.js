import { HTTP } from "@/interceptor/interceptor.js";

let timer = "";

export default {
  namespaced: true,
  state: {
    authData: [],
    sessionId: "",
  },
  getters: {
    authData: (state) => state.authData,
    token: (state) => (state.authData && state.authData.token ? state.authData.token : ""),
    isUserLoggedIn: (state) => (state.authData && state.authData.token ? true : false),
    sessionId: (state) => state.sessionId,
  },
  mutations: {
    setAuthData(state, data) {
      state.authData = data;
    },
    setSessionId(state, data) {
      state.sessionId = data;
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
              let sessionId = `Guest:${new Date().getTime()}`;
              commit("setSessionId", sessionId);
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

    // eslint-disable-next-line no-empty-pattern
    forgotPassword({}, params) {
      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}forgot-password`, params)
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    changePassword({ commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        HTTP.put(`${process.env.VUE_APP_API_URL}forgot-password`, params)
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
  },
};

/* We'll load the axios HTTP library which allows us to easily issue requests*/

import store from "@/store/index.js";

window.axios = require("axios");

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.headers.common["Content-Type"] = "application/json";
window.axios.defaults.headers.common["Apikey"] = process.env.VUE_APP_API_KEY;

export const HTTP = window.axios;

HTTP.interceptors.request.use(
  (config) => {
    store.commit("loader/updateLoader", true);
    const token = store.getters["auth/token"];
    const sessionId = store.getters["auth/sessionId"];
    // window.axios.defaults.headers.common["sessionId"] = sessionId;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (sessionId) {
      config.headers.Sessionid = sessionId;
    }
    return config;
  },
  (error) => {
    store.commit("loader/updateLoader", false);
    Promise.reject(error);
  }
);

HTTP.interceptors.response.use(
  (response) => {
    store.commit("loader/updateLoader", false);
    return response;
  },
  (error) => {
    store.commit("loader/updateLoader", false);
    Promise.reject(error);
  }
);

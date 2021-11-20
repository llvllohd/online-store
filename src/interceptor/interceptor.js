/* We'll load the axios HTTP library which allows us to easily issue requests*/

// import store from "@/store/index.js";

window.axios = require("axios");

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.headers.common["Content-Type"] = "application/json";
window.axios.defaults.headers.common["accessCode"] = process.env.VUE_APP_API_KEY;

export const HTTP = window.axios;

HTTP.interceptors.request.use(
  (config) => {
    // const token = store.getters["auth/token"];
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

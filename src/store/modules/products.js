import { HTTP } from "@/interceptor/interceptor.js";
// eslint-disable-next-line no-unused-vars

export default {
  namespaced: true,
  state: {
    products: [],
  },
  getters: {
    products: (state) => state.products,
  },
  mutations: {
    setProducts(state, data) {
      state.products = data;
    },
  },
  actions: {
    getProducts({ commit }) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}products`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setProducts", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // eslint-disable-next-line no-empty-pattern
    getProductById({}, productId) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}products/${productId}`)
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    addProduct({ commit }, params) {
      let formData = new FormData();
      formData.append("category_id", params.category_id);
      formData.append("name", params.name);
      formData.append("description", params.description);
      formData.append("is_visible", params.is_visible);
      formData.append("is_available", params.is_available);
      formData.append("price", params.price);
      formData.append("on_offer", params.on_offer);
      formData.append("offer_price", params.offer_price);
      formData.append("image_file", params.image_file);

      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}products`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setProducts", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    updateProduct({ commit }, params) {
      console.log(params);
      let formData = new FormData();
      formData.append("category_id", params.category_id);
      formData.append("name", params.name);
      formData.append("description", params.description);
      formData.append("is_visible", params.is_visible);
      formData.append("is_available", params.is_available);
      formData.append("price", params.price);
      formData.append("on_offer", params.on_offer);
      formData.append("offer_price", params.offer_price);
      formData.append("image_file", params.image_file);
      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}products/${params.product_id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setProducts", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    deleteProduct({ commit }, productId) {
      return new Promise((resolve, reject) => {
        HTTP.delete(`${process.env.VUE_APP_API_URL}products/${productId}`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setProducts", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
};

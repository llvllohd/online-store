<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <div class="p-1 sm:p-3 w-full">
      <!-- Back button & title -->
      <section class="w-full flex items-center justify-between text-xl sm:text-2xl font-bold p-3 mb-3">
        <div class="flex items-center w-1/6">
          <span
            class="flex items-center justify-center sm:cursor-pointer rounded-full h-7 w-7 sm:h-9 sm:w-9 border hover:border-gray-900"
            @click.prevent="router.go(-1)"
          >
            <fa :icon="['fa', 'arrow-left']" class="text-sm sm:text-lg text-gray-900"> </fa>
          </span>
        </div>
        <div class="flex items-center justify-center w-4/6 ">Products</div>
        <div class="w-1/6"></div>
      </section>

      <!-- Add Category -->
      <div class="flex items-center justify-end mb-2">
        <router-link
          :to="{ name: 'Add Product' }"
          class=" text-white bg-gray-900 hover:bg-gray-800 font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          ADD
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="text-left border border-gray-400 p-2">Name</th>
              <th class="text-left border border-gray-400 p-2">Description</th>
              <th class="text-left border border-gray-400 p-2">Visible</th>
              <th class="text-left border border-gray-400 p-2">Available</th>
              <th class="text-left border border-gray-400 p-2">Price</th>
              <th class="text-center border border-gray-400 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="border border-gray-400 p-2">{{ product.name }}</td>
              <td class="border border-gray-400 p-2">{{ product.description }}</td>
              <td class="border border-gray-400 p-2">{{ product.is_visible == 1 ? "Yes" : "No" }}</td>
              <td class="border border-gray-400 p-2">{{ product.is_available == 1 ? "Yes" : "No" }}</td>
              <td class="border border-gray-400 p-2">{{ product.price }}</td>
              <td class="text-center border border-gray-400 p-2">
                <div class="r cursor-pointer">
                  <router-link :to="{ name: 'Add Product', query: { productId: product.id } }">
                    <fa :icon="['fa', 'edit']" class="text-gray-900 text-sm mr-2"> </fa>
                  </router-link>
                  <fa :icon="['fa', 'trash']" class="text-gray-900 text-sm ml-2" @click.prevent="openAlert(product.id)"> </fa>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <!-- RHS -->
  <section>
    <right-hand-side></right-hand-side>
  </section>

  <!-- Alert Modal -->
  <alert-screen :is-alert="is_alert" :item-id="item_id" @confirm-alert="confirmAlert" :delete-Action="deleteProduct">
    <template v-slot:header>
      <div class="flex items-center justify-center bg-red-500 rounded-full w-5 h-5 mr-2">
        <fa :icon="['fa', 'exclamation']" class="text-white text-xs sm:text-sm"></fa>
      </div>
      Delete Alert
    </template>
    <template v-slot:content>
      Do you want to Delete this ?
    </template>
  </alert-screen>
</template>

<script>
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import RightHandSide from "@/components/common/RightHandSide";
import AlertScreen from "@/components/common/AlertScreen.vue";
import useToast from "@/hooks/useToast";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Products",
  components: { HeaderComponent, RightHandSide, AlertScreen },

  setup() {
    const store = useStore();
    const router = useRouter();
    const products = ref([]);
    const is_alert = ref(false);
    const item_id = ref("");

    const openAlert = (productId) => {
      is_alert.value = true;
      item_id.value = productId;
    };

    const confirmAlert = (value) => {
      if (!value) {
        is_alert.value = value;
      }
    };

    const deleteProduct = (productId) => {
      store.dispatch("products/deleteProduct", productId).then((res) => {
        if (res.data.status) {
          products.value = res.data.data;
          is_alert.value = false;
          useToast(res.data.message, "success");
        } else {
          useToast(res.data.message, "danger");
        }
      });
    };

    onMounted(() => {
      store.dispatch("products/getProducts").then((res) => {
        if (res.data.status) {
          products.value = res.data.data;
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    return {
      router,
      is_alert,
      openAlert,
      confirmAlert,
      item_id,
      products,
      deleteProduct,
    };
  },
};
</script>

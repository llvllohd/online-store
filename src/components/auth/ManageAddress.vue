<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <div class="p-1 sm:p-3 w-full">
      <div class="flex justify-center text-3xl font-bold p-3 mb-3">
        Address Manager
      </div>

      <!-- Add Address -->
      <div class="flex items-center justify-end mb-2">
        <router-link
          :to="{ name: 'Add Address' }"
          class=" text-white bg-gray-900 hover:bg-gray-800 font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          ADD
        </router-link>
      </div>
      <div class="w-full rounded shadow border mb-2" v-for="address in addresses" :key="address.id">
        <div class="flex flex-col m-2 pb-2 border-b">
          <div class="text-base md:text-lg font-medium">{{ address.house_name }}</div>
          <div class="text-sm md:text-base">{{ address.address }}</div>
          <div class="text-sm md:text-base"><span class="font-medium"> Landmark:</span> {{ address.landmark }}</div>
        </div>
        <div class="flex items-center justify-end m-2">
          <div class="flex items-center mr-3 cursor-pointer text-sm">
            <router-link :to="{ name: 'Add Address', query: { addressId: address.id } }">
              <fa :icon="['fa', 'edit']" class="text-gray-900 mr-1"></fa> EDIT
            </router-link>
          </div>
          <div class="flex items-center mr-3 cursor-pointer text-sm" @click.prevent="openAlert(address.id)">
            <fa :icon="['fa', 'trash']" class="text-gray-900 mr-1"></fa>DELETE
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- RHS -->
  <section>
    <right-hand-side></right-hand-side>
  </section>

  <!-- Alert Modal -->
  <alert-screen
    :is-alert="is_alert"
    :item-id="address_id"
    @confirm-alert="confirmAlert"
    :delete-Action="deleteAddress"
  ></alert-screen>
</template>

<script>
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import RightHandSide from "@/components/common/RightHandSide";
import AlertScreen from "@/components/common/AlertScreen.vue";
import useToast from "@/hooks/useToast";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Categories",
  components: { HeaderComponent, RightHandSide, AlertScreen },

  setup() {
    const store = useStore();
    const addresses = ref([]);
    const is_alert = ref(false);
    const address_id = ref("");

    const openAlert = (addressId) => {
      is_alert.value = true;
      address_id.value = addressId;
    };

    const confirmAlert = (value) => {
      if (!value) {
        is_alert.value = value;
      }
    };

    const deleteAddress = (addressId) => {
      store.dispatch("address/deleteAddress", addressId).then((res) => {
        if (res.data.status) {
          addresses.value = res.data.data;
          is_alert.value = false;
          useToast(res.data.message, "success");
        } else {
          useToast(res.data.message, "danger");
        }
      });
    };

    onMounted(() => {
      store.dispatch("address/getAddresses").then((res) => {
        if (res.data.status) {
          addresses.value = res.data.data;
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    return {
      is_alert,
      openAlert,
      confirmAlert,
      address_id,
      addresses,
      deleteAddress,
    };
  },
};
</script>

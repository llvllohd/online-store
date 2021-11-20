<template>
  <div>
    <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
      <div class="p-3 w-full">
        <!-- Back button & title -->
        <TitleScreen title="Address Manager" />

        <!-- Add Address -->
        <div class="flex items-center justify-end mb-2">
          <router-link
            :to="{ name: 'Add Address' }"
            class=" text-white bg-gray-900 hover:bg-gray-800 font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            ADD
          </router-link>
        </div>
        <transition-group
          mode="out-in"
          enter-active-class="animate__animated animate__fadeInDown"
          leave-active-class="animate__animated animate__fadeOutUp"
        >
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
        </transition-group>
      </div>
    </section>

    <!-- Alert Modal -->
    <alert-screen :is-alert="is_alert" :item-id="address_id" @confirm-alert="confirmAlert" :delete-Action="deleteAddress">
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
  </div>
</template>

<script>
import AlertScreen from "@/common/AlertScreen.vue";
import useToast from "@/hooks/useToast";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Categories",
  components: { AlertScreen },

  setup() {
    const store = useStore();
    const router = useRouter();
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
      router,
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

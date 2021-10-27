<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <section class="flex flex-col items-center justify-center p-2 sm:p-3 w-full">
      <!-- Back button & title -->
      <TitleScreen title="Track Orders" />

      <!-- All Orders -->
      <section class="w-full flex flex-wrap items-center justify-between text-sm sm:text-base font-semibold">
        <div :class="['orders-tab', selectedTab == 'new' ? 'selected-tab' : '']" @click="getOrders('Accept', 'new', newOrders)">
          New
        </div>
        <div :class="['orders-tab', selectedTab == 'accepted' ? 'selected-tab' : '']" @click="getOrders('Dispatch', 'accepted', acceptedOrders)">
          Accepted
        </div>
        <div
          :class="['orders-tab', selectedTab == 'dispatched' ? 'selected-tab' : '']"
          @click.prevent="getOrders('Complete', 'dispatched', dispatchedOrders)"
        >
          Dispatched
        </div>
        <div
          :class="['orders-tab', selectedTab == 'completed' ? 'selected-tab' : '']"
          @click.prevent="getOrders('', 'completed', completedOrders)"
        >
          Completed
        </div>
        <div :class="['orders-tab', selectedTab == 'rejected' ? 'selected-tab' : '']" @click.prevent="getOrders('', 'rejected', rejectedOrders)">
          Rejected
        </div>
        <div :class="['orders-tab', selectedTab == 'search' ? 'selected-tab' : '']" @click.prevent="getOrders('', 'search', [])">
          Search
        </div>
      </section>
      <!-- Orders Table  -->
      <section class="w-full overflow-x-auto mt-3">
        <table class="table-auto w-full">
          <!-- v-if="
            (selectedTab == 'new' && newOrders && newOrders.length > 0) ||
              (selectedTab == 'accepted' && acceptedOrders && acceptedOrders.length > 0) ||
              (selectedTab == 'dispatched' && dispatchedOrders && dispatchedOrders.length > 0) ||
              (selectedTab == 'completed' && completedOrders && completedOrders.length > 0) ||
              (selectedTab == 'rejected' && rejectedOrders && rejectedOrders.length > 0)
          " -->
          <thead>
            <tr class="text-xs">
              <th class="text-left border border-gray-400 p-2">Order#</th>
              <th class="text-left border border-gray-400 p-2">Customer</th>
              <th class="text-left border border-gray-400 p-2">Mobile</th>
              <th class="text-left border border-gray-400 p-2">Order Time</th>
              <th class="text-center border border-gray-400 p-2">Amount</th>
              <th class="text-center border border-gray-400 p-2">Payment</th>
              <th class="text-center border border-gray-400 p-2">Status</th>
              <th class="text-center border border-gray-400 p-2">View</th>
              <th class="text-center border border-gray-400 p-2" v-if="selectedColumnName != ''">
                {{ selectedColumnName }}
              </th>
              <th class="text-center border border-gray-400 p-2" v-if="selectedColumnName != '' && selectedColumnName != 'Complete'">
                Reject
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-xs" v-for="order in selectedOrders" :key="order.id">
              <td class="border border-gray-400 p-2">{{ order.transaction_id }}</td>
              <td class="border border-gray-400 p-2">{{ order.user_name }}</td>
              <td class="border border-gray-400 p-2 ">{{ order.user_phone }}</td>
              <td class="border border-gray-400 p-2">
                <div class="w-16">{{ order.created_at }}</div>
              </td>
              <td class="border border-gray-400 p-2">{{ order.total_amount }}</td>
              <!-- <td class="border border-gray-400 p-2">{{ order.payment_status }}</td> -->
              <td class="border border-gray-400 p-2">
                <div>
                  <Toggle
                    @change="updatePaymentStatus(order)"
                    v-model="order.payment_status"
                    on-label="Paid"
                    off-label="Unpaid"
                    :classes="{
                      container: 'inline-block rounded-full outline-none focus:ring focus:ring-green-500 focus:ring-opacity-30',
                      toggle:
                        'flex items-center justify-start w-16 h-4 rounded-full relative cursor-pointer transition box-content border-2 text-xs leading-none',
                      toggleOn: 'bg-green-500 border-green-500 text-white',
                      toggleOff: 'bg-gray-200 border-gray-200 justify-end text-gray-700',
                      toggleOnDisabled: 'bg-gray-300 border-gray-300 justify-start text-gray-400 cursor-not-allowed',
                      toggleOffDisabled: 'bg-gray-200 border-gray-200 justify-end text-gray-400 cursor-not-allowed',
                      handle: 'inline-block bg-white w-4 h-4 top-0 rounded-full absolute transition-all',
                      handleOn: 'left-full transform -translate-x-full',
                      handleOff: 'left-0',
                      handleOnDisabled: 'bg-gray-100 left-full transform -translate-x-full',
                      handleOffDisabled: 'bg-gray-100 left-0',
                      label: 'text-center w-12 select-none',
                    }"
                  />
                </div>
              </td>
              <td class="border border-gray-400 p-2">{{ order.status_admin }}</td>
              <td class="text-center border border-gray-400 p-2">
                <div class="font-bold text-base cursor-pointer">
                  <router-link :to="{ name: 'Order Detail', query: { orderId: order.id } }">
                    <fa :icon="['fa', 'eye']" class="text-gray-900"> </fa>
                  </router-link>
                </div>
              </td>
              <td class="text-center border border-gray-400 p-2" v-if="selectedColumnName != ''">
                <div class="font-bold text-base cursor-pointer">
                  <fa :icon="['fa', 'check']" class="text-green-500" @click.prevent="updateOrderStatus(order.id)"> </fa>
                </div>
              </td>
              <td class="text-center border border-gray-400 p-2" v-if="selectedColumnName != '' && selectedColumnName != 'Complete'">
                <div class="font-bold text-base cursor-pointer">
                  <fa :icon="['fa', 'times']" class="text-red-500" @click.prevent="openAlert(order.id)"> </fa>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  </section>
  <!-- RHS -->
  <section>
    <right-hand-side></right-hand-side>
  </section>

  <!-- Alert Modal -->
  <alert-screen :is-alert="isAlert" :item-id="orderId" @confirm-alert="confirmAlert" :delete-Action="rejectOrder">
    <template v-slot:header>
      <div class="flex items-center justify-center bg-red-500 rounded-full w-5 h-5 mr-2">
        <fa :icon="['fa', 'exclamation']" class="text-white text-xs sm:text-sm"></fa>
      </div>
      Reject Alert
    </template>
    <template v-slot:content>
      Do you want to Reject this Order ?
    </template>
  </alert-screen>
</template>

<script>
import useToast from "@/hooks/useToast";
import AlertScreen from "@/common/AlertScreen.vue";
import Toggle from "@vueform/toggle";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Track Order",
  components: { AlertScreen, Toggle },

  setup() {
    const store = useStore();
    const router = useRouter();
    const isSubmitting = ref(false);
    const allOrders = ref([]);
    const selectedOrders = ref([]);
    const newOrders = ref([]);
    const acceptedOrders = ref([]);
    const dispatchedOrders = ref([]);
    const completedOrders = ref([]);
    const rejectedOrders = ref([]);
    const selectedTab = ref("new");
    const isNew = ref(true);
    const isAccepted = ref(false);
    const isDispatched = ref(false);
    const isCompleted = ref(false);
    const isRejected = ref(false);
    const isSearch = ref(false);
    const selectedColumnName = ref("Accept");
    const isAlert = ref(false);
    const orderId = ref("");
    const paymentStatus = ref("");

    const getOrders = (columnName, type, orders) => {
      selectedColumnName.value = columnName;
      selectedTab.value = type;
      selectedOrders.value = orders;
    };

    const updateOrdersData = (data) => {
      newOrders.value = data.new_orders;
      acceptedOrders.value = data.accepted_orders;
      dispatchedOrders.value = data.dispatched_orders;
      completedOrders.value = data.delivered_orders;
      rejectedOrders.value = data.rejected_orders;
      if (selectedTab.value == "new") {
        selectedOrders.value = newOrders.value;
      } else if (selectedTab.value == "accepted") {
        selectedOrders.value = acceptedOrders.value;
      } else if (selectedTab.value == "dispatched") {
        selectedOrders.value = dispatchedOrders.value;
      } else if (selectedTab.value == "completed") {
        selectedOrders.value = completedOrders.value;
      } else if (selectedTab.value == "rejected") {
        selectedOrders.value = rejectedOrders.value;
      }
    };

    const updateOrderStatus = (orderId) => {
      store.dispatch("orders/updateOrderStatus", orderId).then((res) => {
        if (res.data.status) {
          updateOrdersData(res.data.data);
          useToast(res.data.message, "success");
        } else {
          useToast(res.data.message, "danger");
        }
      });
    };

    const updatePaymentStatus = (order) => {
      store
        .dispatch("orders/updatePaymentStatus", {
          order_id: order.id,
          payment_status: order.payment_status,
        })
        .then((res) => {
          if (res.data.status) {
            updateOrdersData(res.data.data);
            useToast(res.data.message, "success");
            isAlert.value = false;
          } else {
            useToast(res.data.message, "danger");
          }
        });
    };

    const openAlert = (id) => {
      isAlert.value = true;
      orderId.value = id;
    };

    const confirmAlert = (value) => {
      if (!value) {
        isAlert.value = value;
      }
    };

    const rejectOrder = (orderId) => {
      store.dispatch("orders/rejectOrder", orderId).then((res) => {
        if (res.data.status) {
          updateOrdersData(res.data.data);
          useToast(res.data.message, "success");
          isAlert.value = false;
        } else {
          useToast(res.data.message, "danger");
        }
      });
    };

    onMounted(() => {
      store.dispatch("orders/getAllOrders").then((res) => {
        if (res.data.status) {
          updateOrdersData(res.data.data);
          useToast(res.data.message, "success");
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    return {
      router,
      isSubmitting,
      selectedTab,
      selectedOrders,
      allOrders,
      newOrders,
      acceptedOrders,
      dispatchedOrders,
      completedOrders,
      rejectedOrders,
      getOrders,
      isNew,
      isAccepted,
      isDispatched,
      isCompleted,
      isRejected,
      isSearch,
      updateOrderStatus,
      selectedColumnName,
      rejectOrder,
      orderId,
      isAlert,
      openAlert,
      confirmAlert,
      paymentStatus,
      updatePaymentStatus,
    };
  },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>

<style>
.orders-tab {
  @apply flex items-center justify-center w-1/3 border-l border-t pt-2 pb-2 mb-2 sm:cursor-pointer hover:bg-gray-50;
}
.selected-tab {
  @apply bg-gray-50 border-gray-900 border-r;
}
</style>

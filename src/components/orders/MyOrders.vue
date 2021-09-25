<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <section class="flex flex-col items-center justify-center p-2 sm:p-3 w-full" v-if="myOrders">
      <div class="flex justify-center text-3xl font-bold p-3 mb-3">
        My Orders
      </div>
      <!-- Buttons -->
      <div class="w-full flex items-center justify-between">
        <div
          @click.prevent="getOrders('active')"
          class="flex items-center justify-center w-full font-bold mr-1 py-2 shadow border
        rounded text-sm sm:text-base"
          :class="is_active_orders ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-white hover:bg-gray-50 text-gray-900 '"
        >
          Active Orders
        </div>
        <div
          @click.prevent="getOrders('historical')"
          class="flex items-center justify-center w-full font-bold ml-1 py-2 shadow border
        rounded text-sm sm:text-base"
          :class="is_historical_orders ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-white hover:bg-gray-50 text-gray-900 '"
        >
          Historical Orders
        </div>
      </div>
      <!-- Active Orders -->
      <div
        class="w-full shadow rounded mt-2 flex"
        :class="activeOrders && activeOrders.length > 0 ? '' : 'h-96'"
        v-if="is_active_orders"
      >
        <section v-if="activeOrders && activeOrders.length > 0">
          <div v-for="(activeOrder, index) in activeOrders" :key="index">
            <div class="card flex flex-wrap shadow p-2" v-for="order in activeOrder.orders" :key="order.id">
              <div class="w-1/2 font-semibold">Order ID</div>
              <div class="w-1/2">{{ order.transaction_id }}</div>
              <div class="w-1/2 font-semibold">Order Date/Time</div>
              <div class="w-1/2">{{ order.created_at }}</div>
              <div class="w-1/2 font-semibold">Order Total</div>
              <div class="w-1/2">&#8377; {{ order.total_amount }}</div>
              <div class="w-1/2 font-semibold">Status</div>
              <div class="w-1/2">{{ order.order_status }}</div>
              <router-link
                :to="{ name: 'Order Detail', query: { orderId: order.id } }"
                class="flex items-center justify-center w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 mt-3 
        rounded focus:outline-none focus:shadow-outline text-sm sm:text-base"
              >
                Order Detail
              </router-link>
            </div>
          </div>
        </section>
        <section class="w-full flex flex-col items-center justify-center" v-else>
          <div class="w-full md:w-2/3 shadow">
            <div class="flex flex-col items-center justify-center text-3xl font-bold p-3">
              <div
                class="flex items-center  justify-center border border-red-500 text-red-500 rounded-full w-12 h-12 md:w-16 md:h-16"
              >
                <fa :icon="['fa', 'exclamation']" class="text-2xl md:text-4xl"> </fa>
              </div>
              <div class="text-lg md:text-2xl text-red-500 mt-3">No Orders Found!</div>
            </div>
          </div>
          <div class="w-full md:w-2/3 flex items-center justify-between mt-3">
            <router-link
              :to="{ name: 'Menu Items' }"
              class="flex items-center justify-center w-full bg-gray-900 hover:bg-gray-800 text-white font-bold mr-1 py-2 px-4 
        rounded focus:outline-none focus:shadow-outline text-sm sm:text-base"
            >
              Go To Menu
            </router-link>
          </div>
        </section>
      </div>
      <!-- Historical Orders -->
      <div
        class="w-full shadow rounded mt-2 flex"
        :class="historicalOrders && historicalOrders.length > 0 ? '' : 'h-96'"
        v-if="is_historical_orders"
      >
        <section v-if="historicalOrders && historicalOrders.length > 0">
          <div v-for="(historicalOrder, index) in historicalOrders" :key="index">
            <div class="card flex flex-wrap shadow p-2" v-for="order in historicalOrder.orders" :key="order.id">
              <div class="w-1/2 font-semibold">Order ID</div>
              <div class="w-1/2">{{ order.transaction_id }}</div>
              <div class="w-1/2 font-semibold">Order Date/Time</div>
              <div class="w-1/2">{{ order.created_at }}</div>
              <div class="w-1/2 font-semibold">Order Total</div>
              <div class="w-1/2">&#8377; {{ order.total_amount }}</div>
              <div class="w-1/2 font-semibold">Status</div>
              <div class="w-1/2">{{ order.order_status }}</div>
              <router-link
                :to="{ name: 'Menu Items' }"
                class="flex items-center justify-center w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 mt-3 
        rounded focus:outline-none focus:shadow-outline text-sm sm:text-base"
              >
                Order Detail
              </router-link>
            </div>
          </div>
        </section>
        <section class="w-full flex flex-col items-center justify-center" v-else>
          <div class="w-full md:w-2/3 shadow">
            <div class="flex flex-col items-center justify-center text-3xl font-bold p-3">
              <div
                class="flex items-center  justify-center border border-red-500 text-red-500 rounded-full w-12 h-12 md:w-16 md:h-16"
              >
                <fa :icon="['fa', 'exclamation']" class="text-2xl md:text-4xl"> </fa>
              </div>
              <div class="text-lg md:text-2xl text-red-500 mt-3">No Orders Found!</div>
            </div>
          </div>
          <div class="w-full md:w-2/3 flex items-center justify-between mt-3">
            <router-link
              :to="{ name: 'Menu Items' }"
              class="flex items-center justify-center w-full bg-gray-900 hover:bg-gray-800 text-white font-bold mr-1 py-2 px-4 
        rounded focus:outline-none focus:shadow-outline text-sm sm:text-base"
            >
              Go To Menu
            </router-link>
          </div>
        </section>
      </div>
    </section>

    <!-- If No Orders -->
    <section class="w-full flex flex-col items-center justify-center" v-else>
      <div class="w-full md:w-2/3 shadow">
        <div class="flex flex-col items-center justify-center text-3xl font-bold p-3">
          <div
            class="flex items-center  justify-center border border-red-500 text-red-500 rounded-full w-12 h-12 md:w-16 md:h-16"
          >
            <fa :icon="['fa', 'exclamation']" class="text-2xl md:text-4xl"> </fa>
          </div>
          <div class="text-lg md:text-2xl text-red-500 mt-3">No Orders Found!</div>
        </div>
      </div>
      <div class="w-full md:w-2/3 flex items-center justify-between mt-3">
        <router-link
          :to="{ name: 'Menu Items' }"
          class="flex items-center justify-center w-full bg-gray-900 hover:bg-gray-800 text-white font-bold mr-1 py-2 px-4 
        rounded focus:outline-none focus:shadow-outline text-sm sm:text-base"
        >
          Go To Menu
        </router-link>
      </div>
    </section>
  </section>
  <!-- RHS -->
  <section>
    <right-hand-side></right-hand-side>
  </section>
</template>

<script>
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import RightHandSide from "@/components/common/RightHandSide";
import useToast from "@/hooks/useToast";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import {} from "vue-router";

export default {
  name: "My Orders",
  components: { HeaderComponent, RightHandSide },

  setup() {
    const store = useStore();
    const myOrders = ref([]);
    const activeOrders = ref([]);
    const historicalOrders = ref([]);
    const is_active_orders = ref(true);
    const is_historical_orders = ref(false);

    const getOrders = (type) => {
      if (type == "active") {
        is_active_orders.value = true;
        is_historical_orders.value = false;
      } else {
        is_historical_orders.value = true;
        is_active_orders.value = false;
      }
    };

    onMounted(() => {
      store.dispatch("orders/getMyOrders").then((res) => {
        if (res.data.status) {
          myOrders.value = res.data.data;
          activeOrders.value = res.data.data.active_orders;
          historicalOrders.value = res.data.data.historical_orders;
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    return {
      myOrders,
      activeOrders,
      historicalOrders,
      is_active_orders,
      is_historical_orders,
      getOrders,
    };
  },
};
</script>

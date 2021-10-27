<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <section class="flex flex-col items-center justify-center p-2 sm:p-3 w-full">
      <!-- Back button & title -->
      <TitleScreen title="Order Detail" />
    </section>

    <div class="w-full md:w-2/3 shadow">
      <div class="flex flex-col items-center justify-center text-3xl font-bold p-3">
        <div class="flex items-center justify-center border rounded-full w-12 h-12 md:w-16 md:h-16 mt-2">
          <fa :icon="['fa', 'check']" class="text-2xl md:text-4xl"> </fa>
        </div>
        <div class="text-sm md:text-base mt-2 " :class="orderDetail.status_id == 5 ? 'text-red-500' : 'text-green-500'">
          {{ orderDetail.order_status }}
        </div>
        <div class="text-sm md:text-base mt-2">Order #{{ orderDetail.transaction_id }}</div>
      </div>

      <div class="overflow-x-auto p-3">
        <table class="table-auto w-full">
          <tbody class="border-t">
            <th class="p-1 text-left text-sm">Item Name</th>
            <th class="p-1 text-center text-sm">Quantity</th>
            <th class="p-1 text-right text-sm">Price</th>
          </tbody>
          <tbody>
            <tr v-for="item in orderDetail.items" :key="item.id" class="border-t border-b">
              <td class="p-1 text-left text-xs md:text-sm">{{ item.menu_item_name }}</td>
              <td class="p-1 text-center text-xs md:text-sm">{{ item.quantity }}</td>
              <td class="p-1 text-right text-xs md:text-sm">&#8377; {{ item.total_price }}</td>
            </tr>
            <!-- Sub Total -->
            <tr class="border-b">
              <th colspan="1"></th>
              <th colspan="1" class="p-1 text-right text-xs md:text-sm">Sub Total</th>
              <th colspan="1" class="p-1 text-right text-xs md:text-sm">&#8377; {{ orderDetail.sub_total }}</th>
            </tr>
            <!-- Delivery Charge -->
            <tr class="border-b">
              <th colspan="1"></th>
              <th colspan="1" class="p-1 text-right text-xs md:text-sm">Delivery Charge</th>
              <th colspan="1" class="p-1 text-right text-xs md:text-sm">&#8377; {{ orderDetail.delivery_charges }}</th>
            </tr>
            <!-- Total -->
            <tr class="border-b">
              <th colspan="1"></th>
              <th colspan="1" class="p-1 text-right text-xs md:text-sm">Total</th>
              <th colspan="1" class="p-1 text-right text-xs md:text-sm">&#8377; {{ orderDetail.total_amount }}</th>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="w-full rounded p-3" v-if="orderDetail && orderDetail.user_address">
        <div class="text-sm md:text-lg font-bold">
          Address :
        </div>
        <div class="flex flex-col mt-1">
          <div class="text-sm md:text-base">
            <span class="text-sm md:text-base font-medium"> House Name:</span> {{ orderDetail.user_address.house_name }}
          </div>
          <div class="text-sm md:text-base">
            <span class="text-sm md:text-base font-medium"> Address:</span> {{ orderDetail.user_address.address }}
          </div>
          <div class="text-sm md:text-base">
            <span class="text-sm md:text-base font-medium"> Landmark:</span> {{ orderDetail.user_address.landmark }}
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- RHS -->
  <section>
    <right-hand-side></right-hand-side>
  </section>
</template>

<script>
import useToast from "@/hooks/useToast";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "Cart",
  components: {},

  setup() {
    const store = useStore();
    const route = useRoute();
    const orderDetail = ref([]);

    const orderId = computed(() => route.query.orderId);

    onMounted(() => {
      store.dispatch("orders/getOrderDetail", orderId.value).then((res) => {
        if (res.data.status) {
          orderDetail.value = res.data.data;
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    return {
      orderDetail,
    };
  },
};
</script>

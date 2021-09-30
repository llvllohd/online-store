<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <section class="flex flex-col items-center justify-center p-2 sm:p-3 w-full" v-if="myOrders">
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
        <div class="flex items-center justify-center w-4/6 ">Track Order</div>
        <div class="w-1/6"></div>
      </section>
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
// import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Track Order",
  components: { HeaderComponent, RightHandSide },

  setup() {
    const store = useStore();
    const router = useRouter();
    const myOrders = ref([]);

    onMounted(() => {
      store.dispatch("orders/getOrderStatuses" , ).then((res) => {
        if (res.data.status) {
          myOrders.value = res.data.data;
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    return {
      router,
      myOrders,
    };
  },
};
</script>

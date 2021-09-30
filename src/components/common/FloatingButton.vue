<template>
  <div
    class="w-full md:w-1/2 fixed bottom-0 flex items-center text-sm md:text-base p-3 px-3 rounded-t bg-gray-900 text-white sm:cursor-pointer"
    :class="route.name != 'Checkout' ? 'justify-between' : 'justify-center'"
    @click.prevent="gotoSelectedScreen()"
    v-if="totalCartCount > 0"
  >
    <div
      class="flex items-center justify-center rounded-full border h-6 md:h-7 w-6 md:w-7 text-sm"
      v-if="route.name != 'Checkout'"
    >
      {{ totalCartCount }}
    </div>
    <div class="flex items-center justify-center font-semibold">{{ floatingButtonText }}</div>
    <div class="flex items-center justify-center text-sm" v-if="route.name != 'Checkout'">&#8377; {{ totalAmount }}</div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// import { onMounted, ref, watch } from "vue";

export default {
  name: "Floating Button",
  components: {},
  props: {
    floatingButtonText: {
      type: String,
      required: true,
      // default: "Review Order",
    },
    isLink: {
      type: Boolean,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    clickMethod: {
      type: Function,
      // default: () => 1,
    },
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const gotoSelectedScreen = () => {
      if (props.isLink) {
        router.push({ name: props.link });
      } else {
        props.clickMethod();
      }
    };

    const totalCartCount = computed(() => store.getters["cart/cartCount"]);
    const totalAmount = computed(() => store.getters["cart/totalAmount"]);

    return {
      route,
      gotoSelectedScreen,
      totalCartCount,
      totalAmount,
    };
  },
};
</script>

<template>
  <div class="fixed top-0 flex items-center justify-center opacity-95 bg-gray-900 w-full h-full z-50" v-if="isStartLoading">
    <div>
      <fa :icon="['fa', 'spinner']" class="text-4xl  text-white" spin> </fa>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import {} from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Navigation",
  setup() {
    const store = useStore();
    const isStartLoading = computed(() => store.getters["loader/startLoading"]);

    return { isStartLoading };
  },
};
</script>

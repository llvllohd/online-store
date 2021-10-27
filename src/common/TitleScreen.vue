<template>
  <section class="w-full flex items-center justify-between text-xl sm:text-2xl font-bold p-3 mb-3">
    <div class="flex items-center w-1/6">
      <span
        class="flex items-center justify-center sm:cursor-pointer rounded-full h-7 w-7 sm:h-9 sm:w-9 border hover:border-gray-900"
        @click.prevent="router.go(-1)"
      >
        <fa :icon="['fa', 'arrow-left']" class="text-sm sm:text-lg text-gray-900"> </fa>
      </span>
    </div>
    <div class="flex items-center justify-center w-4/6">{{ title }}</div>
    <div class="w-1/6"></div>
  </section>
</template>

<script>
import {} from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Title",
  components: {},
  props: {
    title: {
      type: String,
    },
  },
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
};
</script>

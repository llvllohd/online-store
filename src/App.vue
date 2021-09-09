<template>
  <router-view> </router-view>
  <!-- <transition>
      <component :is="Component" />
    </transition> -->
  <Loader> </Loader>
</template>

<script>
import {} from "vue";
import Loader from "@/components/common/LoaderScreen.vue";

export default {
  name: "App",
  components: {
    Loader,
  },
};
</script>

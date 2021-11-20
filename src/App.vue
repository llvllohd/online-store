<template>
  <!-- HEADER -->
  <header-component></header-component>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" enter-active-class="animate__animated animate__zoomIn">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- RHS -->
  <right-hand-side></right-hand-side>
  <!-- LOADER -->
  <Loader> </Loader>
</template>

<script>
import { computed } from "vue";
import Loader from "@/common/LoaderScreen.vue";
import { useStore } from "vuex";

export default {
  name: "App",
  components: {
    Loader,
  },
  setup() {
    const store = useStore();
    const sessionId = computed(() => store.getters["auth/sessionId"]);
    if (!sessionId.value) {
      let sessionId = `Guest:${new Date().getTime()}`;
      store.commit("auth/setSessionId", sessionId);
    }

    return {
      sessionId,
    };
  },
};
</script>

<template>
  <router-view> </router-view>
  <!-- <transition>
      <component :is="Component" />
    </transition> -->
  <Loader> </Loader>
</template>

<script>
import { computed } from "vue";
import Loader from "@/components/common/LoaderScreen.vue";
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

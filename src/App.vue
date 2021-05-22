<template>
  <header-component></header-component>

  <router-view v-slot="{ Component }">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__lightSpeedInLeft"
      leave-active-class="animate__animated animate__lightSpeedOutRight"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import {} from "vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
  },

  setup() {
    return {};
  },
};
</script>

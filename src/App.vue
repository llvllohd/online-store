<template>
  <header-component></header-component>

    <router-view> </router-view>
    <!-- <transition>
      <component :is="Component" />
    </transition> -->

</template>

<script>
import HeaderComponent from "./common/HeaderComponent.vue";
import {} from "vue";

export default {
  name: "App",
  components: { HeaderComponent },
};
</script>

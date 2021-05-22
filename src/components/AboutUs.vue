<template>
  <!-- <header-component></header-component> -->
  <div class="flex items-center justify-center sidebar-custom-height">
    <div class="w-1/3 h-1/3 bg-green-400 flex items-center justify-center">
      <h3>I am About Us</h3>
    </div>
  </div>
</template>

<script>
// import HeaderComponent from "../components/HeaderComponent.vue";
import {} from "vue";

export default {
  name: "App",
  components: {
    
  },

  setup() {
    return {};
  },
};
</script>

<style scoped>
.sidebar-custom-height {
  height: calc(100vh - theme("spacing.16"));
  transition: all 0.5s ease-in-out;
}
</style>

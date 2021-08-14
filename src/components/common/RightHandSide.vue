<template>
  <div class="top min-h-no-header hidden sm:flex sm:w-1/2 fixed top-0 right-0">
    <div class="w-full bg-cover bg-center" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"></div>
  </div>
</template>

<script>
import backgroundImage from "@/assets/images/crochet-background.jpg";

export default {
  name: "Right Hand Side",
  components: {},
  setup() {
    return {
      backgroundImage,
    };
  },
};
</script>

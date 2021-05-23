<template>
  <div class="sidebar-custom-height flex items-center justify-center">
    <div
      class="w-1/3 h-1/3 bg-yellow-400 flex items-center justify-center text-center"
    >
      <h3>I am Categories</h3>
    </div>
  </div>
</template>

<style scoped>
.sidebar-custom-height {
  height: calc(100vh - theme("spacing.16"));
  transition: all 0.5s ease-in-out;
}
</style>

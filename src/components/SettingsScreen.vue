<template>
  <div class="flex items-center justify-center sidebar-custom-height">
    <div class="w-1/3 h-1/3 bg-gray-400 flex items-center justify-center">
      <h3>I am Settings</h3>
    </div>
  </div>
</template>

<style scoped>
.sidebar-custom-height {
  height: calc(100vh - theme("spacing.16"));
  transition: all 0.5s ease-in-out;
}
</style>

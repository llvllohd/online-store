<template>
  <div class="flex items-center justify-center">
    <div
      class="w-1/3 sidebar-custom-height bg-green-400 flex items-center justify-center"
    >
      <div class="flex items-center justify-center">
        <h3>I am About Us</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-custom-height {
  min-height: calc(100vh - theme("spacing.16"));
  transition: all 0.5s ease-in-out;
}
</style>

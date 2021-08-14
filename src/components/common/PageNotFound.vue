<template>
  <div class="bg-gradient-to-r from-purple-300 to-blue-200">
    <div class="w-10/12 m-auto py-16 min-h-screen flex items-center justify-center">
      <div class="bg-white shadow overflow-hidden rounded-lg pb-8">
        <div class="border-t border-gray-200 text-center pt-8">
          <h1 class="text-5xl sm:text-7xl font-bold text-purple-400">404</h1>
          <h1 class="text-2xl sm:text-4xl font-medium py-5">oops! Page not found</h1>
          <p class="text:sm sm:text-xl pb-8 px-3 font-medium">
            The page you are looking for does not exist. It might have been moved or deleted.
          </p>

          <router-link
            :to="{ name: 'Menu Items' }"
            class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
          >
            GO TO MENU
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <!-- Header -->
  <nav class="w-full h-16 fixed top-0 bg-gray-900 flex flex-row items-center px-3 z-50" id="header">
    <!-- Mobile Header -->
    <div class="flex md:hidden items-center justify-between w-full">
      <!-- Hamburger -->
      <div
        class="relative w-10 h-10 ring-1 ring-white rounded cursor-pointer flex items-center justify-center transition duration-500 ease-in-out"
        :class="isToggle ? 'open' : ''"
        @click.stop="toggleMenu"
      >
        <div
          class="menu-btn__line bg-white rounded w-8 h-1 flex items-center justify-center duration-500 transition ease-in-out"
        ></div>
      </div>

      <div class="flex items-center justify-end" @click.prevent="$router.push({ name: 'Cart' })">
        <fa :icon="['fa', 'shopping-cart']" class="text-3xl text-white"> </fa>
      </div>
    </div>

    <div class="w-2/5 h-full hidden md:flex">
      <!-- Image -->
      <div class="flex mx-5">
        <img
          class="rounded-full h-14 w-14 mx-auto my-auto"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <!-- Name -->
      <div class="flex mx-5">
        <h5 class="text-white text-lg font-bold my-auto">Fatimas</h5>
      </div>
    </div>
    <!-- Nav Items -->
    <ul class="w-3/5 h-full hidden md:flex flex-row justify-start items-center space-x-5 md:space-x-10 cursor-pointer">
      <li class="nav text-white text-lg font-bold relative p-1">
        <router-link :to="{ name: 'Menu Items' }" class="nav-lg">
          Menu
        </router-link>
      </li>

      <li class="nav text-white text-lg font-bold relative p-1" v-if="isUserLoggedIn">
        <router-link :to="{ name: 'Categories' }" class="nav-lg">
          Categories
        </router-link>
      </li>
      <li class="nav text-white text-lg font-bold relative p-1" v-if="isUserLoggedIn">
        <router-link :to="{ name: 'Products' }" class="nav-lg">
          Products
        </router-link>
      </li>
      <li class="nav text-white text-lg font-bold relative p-1">
        <router-link :to="{ name: 'Cart' }" class="nav-lg">
          <fa :icon="['fa', 'shopping-cart']" class="nav-lg  text-sm"> </fa> Cart
        </router-link>
      </li>
      <li class="nav text-white text-lg font-bold relative p-1" v-if="!isUserLoggedIn">
        <router-link :to="{ name: 'Login' }" class="nav-lg">
          Login
        </router-link>
      </li>
      <li class="nav text-white text-lg font-bold relative p-1" v-if="isUserLoggedIn">
        <div class="nav-lg" @click.prevent="logout">
          Logout
        </div>
      </li>
    </ul>
  </nav>

  <!-- Sidebar -->
  <transition
    enter-active-class="animate__animated animate__slideInLeft"
    leave-active-class="animate__animated animate__slideOutLeft"
  >
    <div v-if="isToggle" class="side-menu sidebar-custom-height bg-gray-900 w-3/6 sm:w-1/3 fixed md:hidden z-50">
      <div class="h-40 flex flex-col items-center justify-center space-y-2">
        <!-- Image -->
        <div class="side-menu w-20 h-20">
          <img
            class="rounded-full mx-auto my-auto"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <!-- Name -->
        <div class="side-menu title relative flex">
          <h5 class=" text-white text-lg font-bold my-auto">Fatimas</h5>
        </div>
      </div>

      <!-- Nav Items -->
      <ul class="w-full h-full flex flex-col justify-start items-center mt-10">
        <li v-for="item in navigation" :key="item.name" class="nav text-white font-bold flex w-full items-center justify-center">
          <router-link
            exact
            :to="item.path"
            @click="gotoLinks(item)"
            class="w-full p-2 flex items-center justify-center"
            v-if="
              (isUserLoggedIn && item.name != 'Login') ||
                (!isUserLoggedIn &&
                  item.name != 'Logout' &&
                  !isUserLoggedIn &&
                  item.name != 'Categories' &&
                  !isUserLoggedIn &&
                  item.name != 'Products')
            "
          >
            <div class="flex items-center justify-center w-1/4">
              <span>
                <fa-layer class="text-xl">
                  <fa :icon="['fa', 'circle']"> </fa>
                  <fa :icon="['fa', item.icon]" class="text-gray-900 text-xs" transform="shrink-0"> </fa>
                </fa-layer>
              </span>
            </div>
            <div class="flex items-center w-2/4">
              <span class="text-lg">
                {{ item.name }}
              </span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useToast from "@/hooks/useToast";
const navigation = [
  { name: "Menu", icon: "home", path: "/", current: true },
  // { name: "About", icon: "info", path: "about", current: false },
  // { name: "Settings", icon: "cog", path: "settings", current: false },
  { name: "Categories", icon: "plus", path: "categories", current: false },
  { name: "Products", icon: "plus", path: "products", current: false },
  { name: "Login", icon: "sign-in-alt", path: "login", current: false },
  { name: "Logout", icon: "sign-out-alt", path: "login", current: false },
];

export default {
  name: "Navigation",
  setup() {
    const router = useRouter();
    const store = useStore();
    let isToggle = ref(false);
    let selected_nav_name = ref("");

    let toggleMenu = () => {
      if (!isToggle.value) {
        isToggle.value = true;
      } else {
        isToggle.value = false;
      }
    };

    let clickAway = (el) => {
      if (!el.target.parentElement.classList.contains("side-menu") && !el.target.classList.contains("side-menu")) {
        isToggle.value = false;
      }
    };

    let gotoLinks = (item) => {
      isToggle.value = false;
      router.push(item.path);
      selected_nav_name.value = item.name;
    };

    const logout = () => {
      store.dispatch("auth/logout").then((res) => {
        if (res.data.status) {
          useToast(res.data.message, "success");
          router.push({ name: "Login" });
        } else {
          useToast(res.data.message, "danger");
        }
      });
    };

    const isUserLoggedIn = computed(() => store.getters["auth/isUserLoggedIn"]);

    watch(isUserLoggedIn, (oldValue, newValue) => {
      if (newValue) {
        router.replace({ name: "Login" });
      }
    });

    onMounted(() => {
      document.addEventListener("click", clickAway);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", clickAway);
    });

    return { isUserLoggedIn, isToggle, toggleMenu, navigation, gotoLinks, selected_nav_name, logout };
  },
};
</script>

<style scoped>
.nav:hover {
  /* color: #ffb400; */
  color: var(--primary);
}

.router-link-active {
  color: #ffb400;
}

.nav-lg.router-link-active::before {
  content: "";
  height: 15px;
  width: 15px;
  position: absolute;
  top: 4px;
  left: -2px;
  border-radius: 3px;
  border-top: 3px solid #ffb400;
  border-left: 3px solid #ffb400;
}

.nav-lg.router-link-active::after {
  content: "";
  height: 15px;
  width: 15px;
  position: absolute;
  bottom: 3px;
  right: -3px;
  border-radius: 3px;
  border-bottom: 3px solid #ffb400;
  border-right: 3px solid #ffb400;
}

.title::before {
  content: "";
  height: 4px;
  width: 50px;
  position: absolute;
  top: 110%;
  left: 0;
  border-radius: 50px;
  background-color: #ffb400;
}

.title::after {
  content: "";
  height: 4px;
  width: 30px;
  position: absolute;
  top: 110%;
  left: 0;
  margin-top: 8px;
  border-radius: 50px;
  background-color: #ffb400;
}

.menu-btn__line::before,
.menu-btn__line::after {
  content: "";
  position: absolute;
  width: 2rem;
  height: 0.25rem;
  background: #fff;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
}

.menu-btn__line::before {
  transform: translateY(-11px);
}

.menu-btn__line::after {
  transform: translateY(11px);
}

.open .menu-btn__line {
  background: transparent;
}

.open .menu-btn__line::before {
  transform: rotate(45deg);
}

.open .menu-btn__line::after {
  transform: rotate(-45deg);
}

.sidebar-custom-height {
  height: calc(100vh - theme("spacing.16"));
  /* margin-top: calc(theme("spacing.16")); */
  transition: all 0.5s ease-in-out;
}

@media (max-width: 598px) {
  .nav:hover {
    color: #ffb400;
    background-color: rgba(31, 41, 55);
    border-right-width: 4px;
    border-right-color: #ffb400;
  }

  .router-link-active {
    color: #ffb400;
    background-color: rgba(31, 41, 55);
    border-right-width: 4px;
    border-right-color: #ffb400;
  }
}
</style>

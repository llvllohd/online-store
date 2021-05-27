<template>
  <!-- Header -->
  <nav class="w-full h-16 fixed bg-gray-900 flex flex-row items-center px-3">
    <!-- Hamburger -->
    <div
      class="relative w-10 h-10 ring-1 ring-white rounded cursor-pointer flex items-center justify-center sm:hidden transition duration-500 ease-in-out"
      :class="isToggle ? 'open' : ''"
      @click.stop="toggleMenu"
    >
      <div
        class="menu-btn__line bg-white rounded w-8 h-1 flex items-center justify-center duration-500 transition ease-in-out"
      ></div>
    </div>

    <div class="w-2/5 h-full hidden sm:flex">
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
        <h5 class="text-white text-lg font-bold my-auto">My Project</h5>
      </div>
    </div>
    <!-- Nav Items -->
    <ul
      class="w-3/5 h-full hidden sm:flex flex-row justify-start items-center space-x-5 md:space-x-10 cursor-pointer"
    >
      <li
        v-for="item in navigation"
        :key="item.name"
        class="nav text-white text-lg font-bold relative p-1"
      >
        <router-link :to="item.path" class="nav-lg">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>

  <!-- Sidebar -->
  <transition
    enter-active-class="animate__animated animate__slideInLeft"
    leave-active-class="animate__animated animate__slideOutLeft"
  >
    <div
      v-if="isToggle"
      class="side-menu sidebar-custom-height bg-gray-900 w-3/6 fixed sm:hidden z-50"
    >
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
          <h5 class=" text-white text-lg font-bold my-auto">My Project</h5>
        </div>
      </div>

      <!-- Nav Items -->
      <ul class="w-full h-full flex flex-col justify-start items-center pt-5">
        <li
          v-for="item in navigation"
          :key="item.name"
          class="nav text-white text-lg font-bold flex w-full items-center justify-center"
        >
          <router-link
            exact
            :to="item.path"
            @click="gotoLinks(item.path)"
            class="w-full p-2 flex items-center justify-center border-b-2"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
const navigation = [
  { name: "Home", path: "/", current: true },
  { name: "Categories", path: "categories", current: true },
  { name: "About", path: "/about", current: false },
  { name: "Settings", path: "settings", current: false },
];

export default {
  name: "Navigation",
  setup() {
    const router = useRouter();

    let isToggle = ref(false);

    let toggleMenu = () => {
      if (!isToggle.value) {
        isToggle.value = true;
      } else {
        isToggle.value = false;
      }
    };

    let clickAway = (el) => {
      if (
        !el.target.parentElement.classList.contains("side-menu") &&
        !el.target.classList.contains("side-menu")
      ) {
        isToggle.value = false;
      }
    };

    let gotoLinks = (links) => {
      isToggle.value = false;
      router.push(links);
    };

    onMounted(() => {
      document.addEventListener("click", clickAway);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", clickAway);
    });

    return { isToggle, toggleMenu, navigation, gotoLinks };
  },
};
</script>

<style scoped>
.nav:hover {
  color: #ffb400;
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
  margin-top: calc(theme("spacing.16"));
  transition: all 0.5s ease-in-out;
}
</style>

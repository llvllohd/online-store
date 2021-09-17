<template>
  <!-- Header -->
  <nav class="w-full h-16 fixed top-0 bg-gray-900 flex flex-row items-center z-50" id="header">
    <!-- Mobile Header -->
    <div class="w-full flex md:hidden items-center justify-between mx-3">
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

      <div class="flex items-center justify-end" @click.prevent="gotoCart()">
        <fa :icon="['fa', 'shopping-cart']" class="text-3xl text-white"> </fa>
        <span class="text-xs font-bold border rounded-full px-2 py-1 bg-white"> {{ totalCartCount }} </span>
      </div>
    </div>

    <div class="w-1/3 h-full hidden md:flex">
      <!-- Image -->
      <div class="flex mx-3">
        <img class="rounded-full h-11 w-11 mx-auto my-auto" src="@/assets/images/user.jpg" alt="" />
      </div>
      <!-- Name -->
      <div class="flex mx-3">
        <h5 class="text-white text-xl font-bold my-auto font-roboto tracking-wide ">Fatimas</h5>
      </div>
    </div>
    <!-- Nav Items -->
    <ul class="w-1/3 h-full hidden md:flex items-center justify-center space-x-5 md:space-x-10 cursor-pointer">
      <li class="nav text-white text-lg font-bold relative p-1">
        <router-link :to="{ name: 'Menu Items' }" class="nav-lg">
          Menu
        </router-link>
      </li>
      <li class="nav text-white text-lg font-bold relative p-1">
        <div :to="{ name: 'Cart' }" class="nav-lg" @click.prevent="gotoCart()">
          <fa :icon="['fa', 'shopping-cart']" class="nav-lg  text-sm"> </fa> Cart
          <span class="text-xs border rounded-full px-1"> {{ totalCartCount }} </span>
        </div>
      </li>
    </ul>

    <!-- User Image -->
    <div class="w-1/3 h-full hidden md:flex items-center justify-end">
      <div class="side-mini-card flex items-center cursor-pointer p-3" @click.stop="openSideMiniCard()">
        <img class="rounded-full h-11 w-11 mx-2 my-auto" src="@/assets/images/user.jpg" alt="" />
        <fa :icon="['fa', 'caret-down']" class="text-white text-sm"> </fa>
      </div>
      <ul class="absolute top-16 pt-1 right-1 w-36 text-sm font-medium cursor-pointer" v-if="isSideMiniCard">
        <li v-if="isUserLoggedIn">
          <div class="dropdown rounded-t border-b bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap">
            Edit Profile
          </div>
        </li>
        <li v-if="isUserLoggedIn">
          <router-link
            :to="{ name: 'Manage Address' }"
            class="dropdown border-b bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap"
          >
            Manage Address
          </router-link>
        </li>
        <li v-if="isUserLoggedIn">
          <router-link
            :to="{ name: 'Categories' }"
            class="dropdown border-b bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap"
          >
            Categories
          </router-link>
        </li>
        <li v-if="isUserLoggedIn">
          <router-link
            :to="{ name: 'Products' }"
            class="dropdown border-b bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap"
          >
            Products
          </router-link>
        </li>

        <li v-if="!isUserLoggedIn">
          <router-link
            :to="{ name: 'Login' }"
            class="dropdown rounded-b rounded-t bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap"
          >
            Login
          </router-link>
        </li>
        <li v-if="isUserLoggedIn">
          <div
            class="dropdown rounded-b rounded-t bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap"
            @click.prevent="logout"
          >
            Logout
          </div>
        </li>
      </ul>
    </div>
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
          <img class="rounded-full mx-auto my-auto" src="@/assets/images/user.jpg" alt="" />
        </div>
        <!-- Name -->
        <div class="side-menu title relative flex">
          <h5 class=" text-white text-lg font-bold my-auto">Fatimas</h5>
        </div>
      </div>

      <!-- Nav Items -->
      <ul class="w-full h-full flex flex-col items-center justify-start mt-10">
        <li v-for="item in navigation" :key="item.name" class="nav text-white flex w-full items-center justify-center">
          <router-link
            exact
            :to="item.path"
            @click="gotoLinks(item)"
            class="w-full p-2 flex items-center justify-center border-b"
            :class="item.name == 'Menu' ? 'border-t' : ''"
            v-if="
              (isUserLoggedIn && item.name == 'Edit Profile') ||
                (isUserLoggedIn && item.name == 'Manage Address') ||
                (isUserLoggedIn && item.name == 'Categories') ||
                (isUserLoggedIn && item.name == 'Products') ||
                (isUserLoggedIn && item.name == 'Logout') ||
                (!isUserLoggedIn && item.name == 'Menu') ||
                (!isUserLoggedIn && item.name == 'Login')
            "
          >
            <div class="flex items-center  mr-3">
              <span>
                <fa-layer class="text-xl">
                  <fa :icon="['fa', 'circle']"> </fa>
                  <fa :icon="['fas', item.icon]" class="text-gray-900 text-xs" transform="shrink-0"> </fa>
                </fa-layer>
              </span>
            </div>
            <div class="flex items-center w-5/6">
              <span class="text-sm font-bold">
                <span> </span>
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
  { name: "Edit Profile", icon: "pencil-alt", path: "/edit-profile", current: false },
  { name: "Manage Address", icon: "cog", path: "/manage-address", current: false },
  { name: "Categories", icon: "shopping-bag", path: "categories", current: false },
  { name: "Products", icon: "shopping-basket", path: "products", current: false },
  { name: "Login", icon: "sign-in-alt", path: "login", current: false },
  { name: "Logout", icon: "sign-out-alt", path: "login", current: false },
];

export default {
  name: "Navigation",
  setup() {
    const router = useRouter();
    const store = useStore();
    let isToggle = ref(false);
    let isSideMiniCard = ref(false);
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
      if (!el.target.parentElement.classList.contains("side-mini-card") && !el.target.classList.contains("side-mini-card")) {
        isSideMiniCard.value = false;
      }
    };

    let gotoLinks = (item) => {
      isToggle.value = false;
      if (item.name == "Logout") {
        logout();
      } else {
        router.push(item.path);
        selected_nav_name.value = item.name;
      }
    };

    let openSideMiniCard = () => {
      isSideMiniCard.value = !isSideMiniCard.value;
    };

    const logout = () => {
      store.dispatch("auth/logout").then((res) => {
        if (res.data.status) {
          useToast(res.data.message, "success");
          store.commit("cart/setCartDetails");
          localStorage.removeItem("Fatimas");
          router.push({ name: "Login" });
        } else {
          useToast(res.data.message, "danger");
        }
      });
    };

    const gotoCart = () => {
      if (totalCartCount.value > 0) {
        router.replace({ name: "Cart" });
      } else {
        useToast("No Items In Cart.", "danger");
      }
    };

    const isUserLoggedIn = computed(() => store.getters["auth/isUserLoggedIn"]);

    const totalCartCount = computed(() => store.getters["cart/cartCount"]);

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

    return {
      isUserLoggedIn,
      isToggle,
      toggleMenu,
      navigation,
      gotoLinks,
      selected_nav_name,
      logout,
      totalCartCount,
      gotoCart,
      isSideMiniCard,
      openSideMiniCard,
    };
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

.router-link-active.dropdown {
  color: var(--primary);
  background-color: #111827;
  /* border-bottom-color: var(--primary); */
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

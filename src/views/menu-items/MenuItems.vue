<template>
  <div>
    <section class="top min-h-no-header w-full md:w-1/2 flex flex-col items-center mb-10" v-if="categories.value && categories.value.length > 0">
      <template class="flex flex-col w-full">
        <!-- Banner Image for Mobile -->
        <section class="w-full h-60 bg-cover bg-center flex sm:hidden" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"></section>
        <!-- Carousel -->
        <div class="z-10 pt-3 pb-3 transition duration-1000 bg-white" id="carousel" :class="isFixed ? 'fixed w-full sm:w-1/2' : ''">
          <carousel
            class="cursor-pointer"
            :items-to-show="3"
            :autoplay="5000"
            :wrap-around="false"
            :transition="1500"
            :breakpoints="breakpoints"
            v-if="categories.value && categories.value.length > 0"
          >
            <slide v-for="category in categories.value" :key="category.id">
              <div
                @click.prevent="positionItemsSection(category)"
                @touchstart.prevent="positionItemsSection(category)"
                class="carousel__item tracking-wider flex w-full items-center justify-center rounded-lg h-8 sm:font-bold font-medium sm:text-sm text-xs text-white  bg-gray-900"
                :class="category_name == category.name ? 'text-yellow-400' : ''"
                v-if="category.menu_items && category.menu_items.length > 0 && category.is_visible"
              >
                {{ category.name }}
              </div>
            </slide>

            <template #addons>
              <!-- <navigation /> -->
              <!-- <pagination /> -->
            </template>
          </carousel>
        </div>
        <!-- Items Card -->
        <section class="transition duration-1000" :class="isFixed ? 'top' : ''" id="section">
          <div :id="category.name" v-for="category in categories.value" :key="category.name">
            <div class="flex items-center justify-center p-3 text-2xl font-bold" v-if="category.menu_items && category.menu_items.length > 0">
              <h4 class="category-name relative uppercase text-lg sm:text-2xl">
                {{ category.name }}
              </h4>
            </div>

            <div data-aos="zoom-in" data-aos-duration="1000" class="items flex flex-row items-center justify-between flex-wrap p-2 ">
              <div class="w-1/2 lg:w-1/3 mb-5" v-for="item in category.menu_items" :key="item.id">
                <div class="card m-1 shadow-lg rounded-lg" v-if="item.is_visible">
                  <div class="image relative">
                    <img :src="item.image_file" class="rounded-t-lg w-full" alt="" v-if="item.image_file && item.image_file.length > 0" />
                    <img :src="require(`@/assets/images/no-image.png`)" class="rounded-t-lg border" style="width: 500px" alt="" v-else />
                    <div class="text-xs font-bold absolute bottom-1 left-1 bg-red-500 text-white rounded-full p-2" v-if="!item.is_available">
                      Out of stock
                    </div>
                  </div>
                  <div class="details flex flex-col items-start justify-around p-2">
                    <div class="item-name">
                      <h5 class="font-medium text-sm sm:text-lg">{{ item.name }}</h5>
                    </div>
                  </div>
                  <div class="flex flex-row justify-around w-full">
                    <button
                      class="rounded mr-1 w-1/2 border-2 border-gray-900  focus:outline-none hover:outline-none py-1 font-bold text-xs sm:text-sm text-gray-900"
                    >
                      &#8377; {{ item.on_offer ? item.offer_price : item.price }}
                    </button>
                    <button
                      class="rounded ml-1 w-1/2 focus:outline-none hover:outline-none py-1 font-medium text-xs sm:text-sm text-white"
                      :class="!item.is_available ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'"
                      @click.prevent="gotoItemDetail(item)"
                      :disabled="!item.is_available"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>
    </section>

    <section
      class="top min-h-no-header w-full md:w-1/2 flex flex-col items-center justify-center"
      v-if="categories.value && categories.value.length <= 0"
    >
      <div class="text-sm sm:text-base font-medium text-red-500">No Products Found.</div>
      <div class="text-medium sm:text-lg font-medium">Please Add Products.</div>
    </section>

    <!-- Floating Button -->
    <floating-button :floatingButtonText="'Review Order'" :isLink="true" :link="'Checkout'"></floating-button>
    <!-- Menu Detail -->
    <transition mode="out-in" enter-active-class="animate__animated animate__zoomIn" leave-active-class="animate__animated animate__zoomOut">
      <item-detail :selectedItem="selected_item" @closeItemDetail="closeItemDetail" v-if="is_item_detail"></item-detail>
    </transition>
  </div>
</template>

<script>
import ItemDetail from "@/views/menu-items/ItemDetails.vue";
import FloatingButton from "@/common/FloatingButton";
import backgroundImage from "@/assets/images/crochet-background.jpg";
import "vue3-carousel/dist/carousel.css";
import useToast from "@/hooks/useToast";
import { Carousel, Slide } from "vue3-carousel";
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { useStore } from "vuex";
import ItemDetails from "./ItemDetails.vue";

export default {
  name: "Menu Items",
  components: {
    ItemDetail,
    FloatingButton,
    Carousel,
    Slide,
  },
  setup() {
    ItemDetails;
    const store = useStore();
    const categories = reactive([]);
    let isFixed = ref(false);
    let is_item_detail = ref(false);
    let category_name = ref("");
    let selected_item = ref([]);

    let breakpoints = ref({
      640: {
        itemsToShow: 5,
        snapAlign: "center",
      },
      768: {
        itemsToShow: 4,
        snapAlign: "center",
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: "center",
      },
    });

    let positionItemsSection = (item) => {
      let header = document.getElementById("header");
      let carousel = document.getElementById("carousel");
      let itemsSection = document.getElementById(item.name);
      let offsetHeight = header.offsetHeight + carousel.offsetHeight;
      window.scrollTo({
        top: itemsSection.offsetTop - offsetHeight,
        left: 0,
        behavior: "smooth",
      });

      for (let i of categories.value) {
        if (item.id === i.id) {
          category_name.value = i.name;
        }
      }
    };

    let gotoItemDetail = (item) => {
      is_item_detail.value = true;
      selected_item.value = item;
    };

    let closeItemDetail = () => {
      is_item_detail.value = false;
    };

    let onScroll = () => {
      let carousel = document.getElementById("carousel");
      let section = document.getElementById("section");
      if (carousel && carousel.getBoundingClientRect().top < 80) {
        isFixed.value = true;
      }
      if (section && section.getBoundingClientRect().top > 150) {
        isFixed.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("scroll", onScroll);

      store.dispatch("menuItems/getMenuItems").then((res) => {
        if (res.data.status) {
          categories.value = res.data.data.categories;
          store.commit("cart/setCartDetails", res.data.data.cart);
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    onBeforeUnmount(() => {
      document.removeEventListener("scroll", onScroll);
    });

    return {
      backgroundImage,
      breakpoints,
      positionItemsSection,
      categories,
      category_name,
      isFixed,
      is_item_detail,
      closeItemDetail,
      gotoItemDetail,
      selected_item,
    };
  },
};
</script>

<style>
.carousel__track {
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel__item {
  /* color: var(--carousel-color-white); */
}

.carousel__slide {
  padding: 1px;
}

/* .carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
} */

.category-name::before {
  content: "";
  height: 20px;
  width: 20px;
  position: absolute;
  top: -2px;
  left: -8px;
  border-radius: 7px;
  border-top: 4px solid #ffb400;
  border-left: 4px solid #ffb400;
}

.category-name::after {
  content: "";
  height: 20px;
  width: 20px;
  position: absolute;
  bottom: -3px;
  right: -9px;
  border-radius: 7px;
  border-bottom: 4px solid #ffb400;
  border-right: 4px solid #ffb400;
}
</style>

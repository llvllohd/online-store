<template>
  <header-component></header-component>
  <!-- LHS -->
  <section
    class="top min-h-no-header w-full md:w-1/2 flex flex-col items-center"
    v-if="categories.value && categories.value.length > 0"
  >
    <template class="flex flex-col w-full">
      <!-- Banner Image for Mobile -->
      <section
        class="w-full h-60 bg-cover bg-center flex sm:hidden"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
      ></section>
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
          <slide v-for="category in categories.value" :key="category.id" class="">
            <div
              @click.prevent="positionItemsSection(category)"
              @touchstart.prevent="positionItemsSection(category)"
              class="carousel__item tracking-wider flex w-full items-center justify-center rounded-lg h-8 sm:font-bold font-medium sm:text-sm text-xs text-white  bg-gray-900"
              :class="category_name == category.name ? 'text-yellow-400' : ''"
              v-if="category.menu_items && category.menu_items.length > 0"
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
          <div
            class="flex items-center justify-center p-3 text-2xl font-bold"
            v-if="category.menu_items && category.menu_items.length > 0"
          >
            <h4 class="category-name relative uppercase text-lg sm:text-2xl">
              {{ category.name }}
            </h4>
          </div>

          <div class="items flex flex-row items-center justify-between flex-wrap p-2 ">
            <div class="w-1/2 lg:w-1/3 mb-5" v-for="item in category.menu_items" :key="item.id">
              <div class="card m-1 shadow-lg rounded-lg">
                <div class="image">
                  <img
                    :src="item.image_file"
                    class="rounded-t-lg w-full"
                    alt=""
                    v-if="item.image_file && item.image_file.length > 0"
                  />
                  <img
                    :src="require(`@/assets/images/no-image.png`)"
                    class="rounded-t-lg border"
                    style="width: 500px"
                    alt=""
                    v-else
                  />
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
                    &#8377; {{ item.price }}
                  </button>
                  <button
                    class="rounded ml-1 w-1/2 bg-gray-900 hover:bg-gray-800 focus:outline-none hover:outline-none py-1 font-medium text-xs sm:text-sm text-white"
                    @click.prevent="goToItemDetails(item.id)"
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

  <!-- RHS -->
  <section>
    <right-hand-side></right-hand-side>
  </section>
</template>

<script>
import HeaderComponent from "@/components/common//HeaderComponent.vue";
import RightHandSide from "@/components/common/RightHandSide";
import backgroundImage from "@/assets/images/crochet-background.jpg";
import "vue3-carousel/dist/carousel.css";
import useToast from "@/hooks/useToast";
import { Carousel, Slide } from "vue3-carousel";
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Menu Items",
  components: {
    HeaderComponent,
    RightHandSide,
    Carousel,
    Slide,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const categories = reactive([]);
    let isFixed = ref(false);
    let category_name = ref("");

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

    let goToItemDetails = (item_id) => {
      router.push({ name: "Item Details", params: { id: item_id } });
    };

    let onScroll = () => {
      let carousel = document.getElementById("carousel");
      let section = document.getElementById("section");
      if (carousel.getBoundingClientRect().top < 80) {
        isFixed.value = true;
      }
      if (section.getBoundingClientRect().top > 150) {
        isFixed.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("scroll", onScroll);

      store.dispatch("menuItems/getMenuItems").then((res) => {
        if (res.data.status) {
          categories.value = res.data.data.categories;
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    onBeforeUnmount(() => {
      document.removeEventListener("scroll", onScroll);
    });

    return {
      isFixed,
      category_name,
      backgroundImage,
      positionItemsSection,
      goToItemDetails,
      categories,
      breakpoints,
    };
  },
};
</script>

<style scoped>
.carousel__item {
  /* color: var(--carousel-color-white); */
}

.carousel__slide {
  padding: 1px;
}

.w-48 {
  width: calc(50% - 2%);
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

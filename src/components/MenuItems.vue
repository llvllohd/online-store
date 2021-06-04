<template>
  <div class="flex items-center justify-center">
    <!-- Small Screens Device -->
    <div class="top h-no-header w-full sm:hidden">
      <div
        class="w-full h-1/3 bg-cover bg-center flex sm:hidden"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
      ></div>
      <div
        class="w-full z-10 pt-3 pb-3 transition duration-1000 bg-white"
        id="carousel"
        :style="isFixed ? 'position:fixed;top:4rem' : ''"
      >
        <carousel
          class="cursor-pointer"
          :items-to-show="3.5"
          :autoplay="5000"
          :wrap-around="true"
          :transition="1500"
        >
          <slide
            v-for="category in categories"
            :key="category.id"
            class="focus:outline-none"
          >
            <div
              @click.prevent="getItemsForMobile(category)"
              @touchstart.prevent="getItemsForMobile(category)"
              class="carousel__item tracking-wider flex w-full items-center justify-center rounded-lg h-8 font-bold text-white text-xs bg-gray-900 cursor-pointer"
              :class="
                category_name == category.name
                  ? 'text-yellow-400 uppercase'
                  : ''
              "
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

      <section
        :style="isFixed ? 'margin-top:64px' : ''"
        class="transition duration-1000"
        id="section"
      >
        <div
          class="flex flex-col min-h-screen"
          :id="category.name"
          v-for="category in categories"
          :key="category.name"
        >
          <div class="flex items-center justify-center p-3 text-2xl font-bold">
            <h4 class="category-name relative uppercase">
              {{ category.name }}
            </h4>
          </div>

          <div
            class="items flex flex-row items-center justify-between flex-wrap p-3"
          >
            <div
              class="card w-48 shadow-lg rounded-lg relative mb-3"
              v-for="item in category.items"
              :key="item.id"
            >
              <div class="image">
                <img
                  :src="require(`../assets/images/${item.image}`)"
                  class="rounded-t-lg h-32 w-full"
                  alt=""
                />
              </div>
              <div
                class="details h-14 flex flex-col items-start justify-around px-2 mb-7"
              >
                <div class="item-name">
                  <h5 class="font-medium text-sm">{{ item.name }}</h5>
                </div>
                <div class="Pice">
                  <h5 class="font-medium text-sm">{{ item.price }}</h5>
                </div>
              </div>
              <button
                class="rounded w-full bg-gray-900 hover:bg-gray-800 focus:outline-none hover:outline-none py-1 font-medium text-sm text-white absolute bottom-0"
                @click.prevent="goToItemDetails(item.id)"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ================================================================================ -->

    <!-- Desktop Device -->
    <div class="w-full hidden sm:flex">
      <div class="top h-no-header w-1/2 flex flex-col">
        <div
          class="w-1/2 z-10 pt-3 pb-3 transition duration-1000 bg-white fixed"
          id="carousel-lg"
        >
          <carousel
            class="cursor-pointer"
            :items-to-show="5"
            :autoplay="5000"
            :wrap-around="true"
            :transition="1500"
            :breakpoints="breakpoints"
          >
            <slide v-for="category in categories" :key="category.id">
              <div
                @click="getItemsForDesktop(category)"
                @touchend="getItemsForDesktop(category)"
                class="carousel__item tracking-wider flex w-full items-center justify-center rounded-lg h-8 font-bold text-sm text-white  bg-gray-900"
                :class="
                  category_name == category.name
                    ? 'text-yellow-400 uppercase'
                    : ''
                "
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

        <section class="transition duration-1000 mt-16" id="section-lg">
          <div
            class="flex flex-col min-h-screen"
            :id="'lg-' + category.name"
            v-for="category in categories"
            :key="category.name"
          >
            <div
              class="flex items-center justify-center p-3 text-2xl font-bold"
            >
              <h4 class="category-name relative uppercase">
                {{ category.name }}
              </h4>
            </div>

            <div
              class="items flex flex-row items-center justify-between flex-wrap p-3 "
            >
              <div
                class="card w-48 shadow-lg rounded-lg relative mb-3"
                v-for="item in category.items"
                :key="item.id"
              >
                <div class="image">
                  <img
                    :src="require(`../assets/images/${item.image}`)"
                    class="rounded-t-lg h-32 w-full"
                    alt=""
                  />
                </div>
                <div
                  class="details h-14 flex flex-col items-start justify-around px-2 mb-7"
                >
                  <div class="item-name">
                    <h5 class="font-medium text-sm">{{ item.name }}</h5>
                  </div>
                  <div class="Pice">
                    <h5 class="font-medium text-sm">{{ item.price }}</h5>
                  </div>
                </div>
                <button
                  class="rounded w-full bg-gray-900 hover:bg-gray-800 hover:outline-none py-1 font-medium text-sm text-white absolute bottom-0"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="top h-no-header w-1/2 fixed right-0">
        <div
          class="w-full h-no-header bg-cover bg-center"
          :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import backgroundImage from "../assets/images/crochet-background.jpg";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

const categories = [
  {
    name: "Stitchings",
    id: 0,
    items: [
      {
        id: 0,
        name: "Stitchings One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 1,
        name: "Stitchings Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 2,
        name: "Stitchings Three",
        price: "5 INR",
        image: "cap-one.jpg",
      },
      {
        id: 3,
        name: "Stitchings Four",
        price: "100 INR",
        image: "cap-one.jpg",
      },
      {
        id: 4,
        name: "Stitchings Five",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 5,
        name: "Stitchings Six",
        price: "75 INR",
        image: "cap-one.jpg",
      },
    ],
  },
  {
    name: "Crochets",
    id: 1,
    items: [
      {
        id: 6,
        name: "Crochets One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 7,
        name: "Crochets Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 8,
        name: "Crochets Three",
        price: "5 INR",
        image: "cap-one.jpg",
      },
      {
        id: 9,
        name: "Crochets Four",
        price: "100 INR",
        image: "cap-one.jpg",
      },
      {
        id: 10,
        name: "Crochets Five",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 11,
        name: "Crochets Six",
        price: "75 INR",
        image: "cap-one.jpg",
      },
    ],
  },
  {
    name: "Pants",
    id: 2,
    items: [
      {
        id: 12,
        name: "Pants One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 13,
        name: "Pants Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 14,
        name: "Pants Three",
        price: "5 INR",
        image: "cap-one.jpg",
      },
    ],
  },
  {
    name: "Shirts",
    id: 3,
    items: [
      {
        id: 15,
        name: "Shirts One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 16,
        name: "Shirts Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 17,
        name: "Shirts Three",
        price: "5 INR",
        image: "cap-one.jpg",
      },
      {
        id: 18,
        name: "Shirts Four",
        price: "100 INR",
        image: "cap-one.jpg",
      },
      {
        id: 19,
        name: "Shirts Five",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 20,
        name: "Shirts Six",
        price: "75 INR",
        image: "cap-one.jpg",
      },
    ],
  },
  {
    name: "Trousers",
    id: 4,
    items: [
      {
        id: 21,
        name: "Trousers One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 22,
        name: "Trousers Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 23,
        name: "Trousers Three",
        price: "5 INR",
        image: "cap-one.jpg",
      },
      {
        id: 24,
        name: "Trousers Four",
        price: "100 INR",
        image: "cap-one.jpg",
      },
      {
        id: 25,
        name: "Trousers Five",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 26,
        name: "Trousers Six",
        price: "75 INR",
        image: "cap-one.jpg",
      },
    ],
  },
  {
    name: "Inners",
    id: 5,
    items: [
      {
        id: 27,
        name: "Inners One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 28,
        name: "Inners Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 29,
        name: "Inners Three",
        price: "5 INR",
        image: "cap-one.jpg",
      },
    ],
  },
];

export default {
  name: "Menu Items",
  components: {
    Carousel,
    Slide,
  },
  setup() {
    const router = useRouter();
    let isFixed = ref(false);
    let category_name = ref("");

    let breakpoints = ref({
      640: {
        itemsToShow: 3,
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

    let getItemsForMobile = (item) => {
      let header = document.getElementById("header");
      let carousel = document.getElementById("carousel");
      let itemsSection = document.getElementById(item.name);
      let offsetHeight = header.offsetHeight + carousel.offsetHeight;
      window.scrollTo(0, itemsSection.offsetTop - offsetHeight);

      for (let i of categories) {
        if (item.id === i.id) {
          category_name.value = i.name;
        }
      }
    };

    let getItemsForDesktop = (item) => {
      let header = document.getElementById("header");
      let carousel = document.getElementById("carousel-lg");
      let itemsSection = document.getElementById("lg-" + item.name);
      let offsetHeight = header.offsetHeight + carousel.offsetHeight;
      window.scrollTo(0, itemsSection.offsetTop - offsetHeight);

      for (let i of categories) {
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
      if (carousel.getBoundingClientRect().top < 64) {
        isFixed.value = true;
      }
      if (section.getBoundingClientRect().top > 130) {
        isFixed.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("scroll", onScroll);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("scroll", onScroll);
    });

    return {
      isFixed,
      category_name,
      backgroundImage,
      getItemsForMobile,
      getItemsForDesktop,
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

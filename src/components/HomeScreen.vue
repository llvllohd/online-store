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
          :items-to-show="4"
          :autoplay="5000"
          :wrap-around="true"
          :transition="1500"
        >
          <slide v-for="category in categories" :key="category.id">
            <div
              @click="getItems(category)"
              class="carousel__item flex w-full items-center justify-center rounded-lg h-8 font-bold text-xs bg-gray-900 cursor-pointer"
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
          class="flex flex-col"
          :id="category.name"
          v-for="category in categories"
          :key="category.name"
        >
          <div class="category-name pl-3 pt-3 text-2xl font-bold">
            {{ category.name }}
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
                  class="rounded-t-lg h-32
            w-full"
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

    <!-- ================================================================================ -->

    <!-- Desktop Device -->
    <div class="w-full hidden sm:flex">
      <div class="top h-no-header w-1/2 flex flex-col">
        <div class="carousel">
          <carousel
            :items-to-show="5"
            :autoplay="5000"
            :wrap-around="true"
            :transition="1500"
          >
            <slide v-for="category in categories" :key="category.id">
              <div
                @click.prevent="getItems(category)"
                class="carousel__item flex w-full items-center justify-center rounded-lg h-8 font-bold text-base bg-gray-900"
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

        <!-- <div class="items flex items-center justify-between flex-wrap p-3">
          <div
            class="card w-48 shadow-lg rounded-lg relative mb-3"
            v-for="item in items"
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
        </div> -->
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
        id: 0,
        name: "Crochets One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 1,
        name: "Crochets Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 2,
        name: "Crochets Three",
        price: "5 INR",
        image: "cap-one.jpg",
      },
      {
        id: 3,
        name: "Crochets Four",
        price: "100 INR",
        image: "cap-one.jpg",
      },
      {
        id: 4,
        name: "Crochets Five",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 5,
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
        id: 0,
        name: "Pants One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 1,
        name: "Pants Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 2,
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
        id: 0,
        name: "Shirts One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 1,
        name: "Shirts Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 2,
        name: "Shirts Three",
        price: "5 INR",
        image: "cap-one.jpg",
      },
      {
        id: 3,
        name: "Shirts Four",
        price: "100 INR",
        image: "cap-one.jpg",
      },
      {
        id: 4,
        name: "Shirts Five",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 5,
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
        id: 0,
        name: "Trousers One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 1,
        name: "Trousers Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 2,
        name: "Trousers Three",
        price: "5 INR",
        image: "cap-one.jpg",
      },
      {
        id: 3,
        name: "Trousers Four",
        price: "100 INR",
        image: "cap-one.jpg",
      },
      {
        id: 4,
        name: "Trousers Five",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 5,
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
        id: 0,
        name: "Inners One",
        price: "25 INR",
        image: "cap-one.jpg",
      },
      {
        id: 1,
        name: "Inners Two",
        price: "60 INR",
        image: "cap-one.jpg",
      },
      {
        id: 2,
        name: "Inners Three",
        price: "5 INR",
        image: "cap-one.jpg",
      },
    ],
  },
];

export default {
  name: "Home Screen",
  components: {
    Carousel,
    Slide,
  },
  setup() {
    let isFixed = ref(false);
    let getItems = (item) => {
      let itemsSection = document.getElementById(item.name);
      let header = document.getElementById("header");
      let carousel = document.getElementById("carousel");
      let offsetHeight = header.offsetHeight + carousel.offsetHeight;
      window.scrollTo(0, itemsSection.offsetTop - offsetHeight);
    };

    let onScroll = () => {
      let carousel = document.getElementById("carousel");
      let section = document.getElementById("section");
      if (carousel.getBoundingClientRect().top < 61) {
        isFixed.value = true;
      }
      if (section.getBoundingClientRect().top > 123) {
        isFixed.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("scroll", onScroll);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("scroll", onScroll);
    });

    return { isFixed, backgroundImage, getItems, categories };
  },
};
</script>

<style scoped>
.carousel__item {
  color: var(--carousel-color-white);
}

.carousel__slide {
  padding: 3px;
}

.w-48 {
  width: calc(50% - 2%);
}

/* .carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
} */
</style>

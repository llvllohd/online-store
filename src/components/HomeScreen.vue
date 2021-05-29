<template>
  <div class="flex items-center justify-center">
    <!-- Small Screens Device -->
    <div class="top h-no-header w-full sm:hidden">
      <div
        class="w-full h-1/3 bg-cover bg-center flex sm:hidden"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
      ></div>
      <div class="carousel w-full">
        <carousel
          :items-to-show="4"
          :autoplay="5000"
          :wrap-around="true"
          :transition="1500"
        >
          <slide v-for="category in categories" :key="category.id">
            <div
              @click="getItems(category.id)"
              class="carousel__item flex w-full items-center justify-center rounded-lg h-8 font-bold text-xs bg-gray-900"
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

      <div
        class="items flex flex-row items-center justify-between flex-wrap p-3"
      >
        <div
          class="card w-48 shadow-lg rounded-lg relative mb-3"
          v-for="item in items"
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
                @click="getItems(category.id)"
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

        <div class="items flex items-center justify-between flex-wrap p-3">
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
        </div>
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

const categories = [
  { name: "Stitchings", id: 0 },
  { name: "Crochets", id: 1 },
  { name: "Pants", id: 2 },
  { name: "Shirts", id: 3 },
  { name: "Trousers", id: 4 },
  { name: "Inners", id: 5 },
  { name: "Caps", id: 6 },
];
const items = [
  {
    id: 0,
    name: "Item One",
    price: "25 INR",
    image: "cap-one.jpg",
  },
  {
    id: 1,
    name: "Item Two",
    price: "60 INR",
    image: "cap-one.jpg",
  },
  {
    id: 2,
    name: "Item Three",
    price: "5 INR",
    image: "cap-one.jpg",
  },
  {
    id: 3,
    name: "Item Four",
    price: "100 INR",
    image: "cap-one.jpg",
  },
  {
    id: 4,
    name: "Item Five",
    price: "25 INR",
    image: "cap-one.jpg",
  },
  {
    id: 5,
    name: "Item Six",
    price: "75 INR",
    image: "cap-one.jpg",
  },
];

export default {
  name: "Home Screen",
  components: {
    Carousel,
    Slide,
  },
  setup() {
    let getItems = (item) => {
      console.log(item);
    };
    return { backgroundImage, getItems, categories, items };
  },
};
</script>

<style scoped>
.carousel__item {
  /* background-color: var(--carousel-color-primary); */
  color: var(--carousel-color-white);
}

.carousel__slide {
  padding: 3px;
  margin-top: 5px;
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

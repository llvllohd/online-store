<template>
  <div class="flex items-center justify-center">
    <div class="top h-no-header w-full">
      <div
        class="w-full h-1/3 bg-cover bg-center flex sm:hidden"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
      ></div>
      <div class="w-full h-2/3">
        <carousel
          :items-to-show="4"
          :autoplay="5000"
          :wrap-around="true"
          :transition="1500"
        >
          <slide v-for="category in categories" :key="category.id">
            <div
              @click="getItems(category.id)"
              class="carousel__item flex w-full items-center justify-center rounded-lg h-10"
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
    </div>

    <div class="top h-no-header w-full sm:w-1/2 hidden">
      <div class="w-full h-no-header ">
        <carousel
          :items-to-show="4.5"
          :autoplay="5000"
          :wrap-around="true"
          :transition="1500"
        >
          <slide v-for="slide in 10" :key="slide">
            <div
              @click="getItems(slide)"
              class="carousel__item flex w-full items-center justify-center rounded-full py-3 px-6"
            >
              {{ slide }}
            </div>
          </slide>

          <template #addons>
            <!-- <navigation /> -->
            <!-- <pagination /> -->
          </template>
        </carousel>
      </div>
    </div>

    <div class="top h-no-header  sm:w-1/2 bg-red-400 hidden">
      <div
        class="w-full h-no-header bg-cover bg-center hidden sm:flex"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
      ></div>
      <div
        class="w-full h-no-header bg-cover bg-center flex sm:hidden"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
      ></div>
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
    return { backgroundImage, getItems, categories };
  },
};
</script>

<style scoped>
.carousel__item {
  background-color: var(--carousel-color-primary);
  color: var(--carousel-color-white);
}

.carousel__slide {
  padding: 3px;
  margin-top: 5px;
}

/* .carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
} */
</style>

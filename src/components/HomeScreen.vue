<template>
  <div class="flex items-center justify-center">
    <div class="top h-no-header w-1/2">
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
    <div class="top h-no-header w-1/2">
      <div
        class="w-full h-no-header bg-cover bg-center"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
      ></div>
    </div>
  </div>
</template>

<script>
import backgroundImage from "../assets/images/crochet-background.jpg";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
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
    return { backgroundImage, getItems };
  },
};
</script>

<style scoped>
.carousel__item {
  min-height: 50px;
  background-color: var(--carousel-color-primary);
  color: var(--carousel-color-white);
}

.carousel__slide {
  padding: 3px;
}

/* .carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
} */
</style>

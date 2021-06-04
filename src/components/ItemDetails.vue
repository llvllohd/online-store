<template>
  <div class="flex items-center justify-center">
    <!-- Small Screens Device -->
    <div class="top h-no-header w-full sm:hidden">
      <div class="w-full h-1/3">
        <img :src="item_detail.image" class="w-full h-full" alt="" />
      </div>
      <div class="images-carousel w-full h-1/3">
        <carousel
          class="cursor-pointer"
          :items-to-show="4"
          :autoplay="5000"
          :wrap-around="false"
          :transition="1500"
        >
          <slide v-for="image in item_detail.images" :key="image.id">
            <img
              @click.prevent="showSelectedImage(image)"
              @touchend.prevent="showSelectedImage(image)"
              :src="image.image"
              class="w-full h-14 rounded-md"
              alt=""
            />
          </slide>

          <template #addons>
            <!-- <navigation /> -->
            <!-- <pagination /> -->
          </template>
        </carousel>
      </div>

      <!-- <div class="w-full h-1/3 mt-10">
        {{ item_detail.name }}
      </div> -->
      <!-- <div class="carousel w-full h-1/3 bg-red-600"></div> -->
    </div>

    <!-- ================================================================================ -->

    <!-- Desktop Device -->
    <div class="w-full hidden sm:flex">
      <div class="top h-no-header w-1/2 flex flex-col"></div>

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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const items = [
  {
    id: 0,
    name: "Stitchings One",
    price: "25 INR",
    image: "https://picsum.photos/seed/picshk/500",
    images: [
      {
        id: 1,
        image: "https://picsum.photos/seed/picsuk/500",
      },
      {
        id: 2,
        image: "https://picsum.photos/seed/picshk/500",
      },
      {
        id: 3,
        image: "https://picsum.photos/seed/hgdfg/500",
      },
      {
        id: 4,
        image: "https://picsum.photos/seed/rtyrt/500",
      },
    ],
  },
  {
    id: 1,
    name: "Stitchings Two",
    price: "60 INR",
    image: "https://picsum.photos/seed/picsuk/500",
    images: [
      {
        id: 1,
        image: "https://picsum.photos/seed/picsuk/500",
      },
      {
        id: 2,
        image: "https://picsum.photos/seed/picshk/500",
      },
      {
        id: 3,
        image: "https://picsum.photos/seed/hgdfg/500",
      },
      {
        id: 4,
        image: "https://picsum.photos/seed/rtyrt/500",
      },
    ],
  },
  {
    id: 2,
    name: "Stitchings Three",
    price: "5 INR",
    image: "https://picsum.photos/seed/rtyrt/500",
    images: [
      {
        id: 1,
        image: "https://picsum.photos/seed/picsuk/500",
      },
      {
        id: 2,
        image: "https://picsum.photos/seed/picshk/500",
      },
      {
        id: 3,
        image: "https://picsum.photos/seed/hgdfg/500",
      },
      {
        id: 4,
        image: "https://picsum.photos/seed/rtyrt/500",
      },
    ],
  },
  {
    id: 3,
    name: "Stitchings Four",
    price: "100 INR",
    image: "https://picsum.photos/seed/hgdfg/500",
    images: [
      {
        id: 1,
        image: "https://picsum.photos/seed/picsuk/500",
      },
      {
        id: 2,
        image: "https://picsum.photos/seed/picshk/500",
      },
      {
        id: 3,
        image: "https://picsum.photos/seed/hgdfg/500",
      },
      {
        id: 4,
        image: "https://picsum.photos/seed/rtyrt/500",
      },
    ],
  },
];

export default {
  name: "Menu Items",
  components: {
    Carousel,
    Slide,
    //  Pagination,
  },
  setup() {
    const route = useRoute();

    let item_detail = ref([]);

    let showSelectedImage = (image) => {
      item_detail.value.image = image.image;
      //   console.log(item_detail.value.image);
      //   console.log(image.image);
    };

    onMounted(() => {
      let item_id = route.params.id;
      for (let item of items) {
        if (item.id == item_id) {
          item_detail.value = item;
        }
      }
    });

    return {
      backgroundImage,
      items,
      item_detail,
      showSelectedImage,
    };
  },
};
</script>

<style scoped>
.carousel__slide {
  padding: 2px;
}
</style>

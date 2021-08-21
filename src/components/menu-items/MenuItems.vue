<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="min-h-no-header w-full sm:w-1/2 flex flex-col items-center">
    <template class="top h-no-header flex flex-col">
      <!-- Carousel -->
      <div class="w-full sm:w-1/2 z-10 pt-3 pb-3 transition duration-1000 bg-white fixed" id="carousel">
        <carousel
          class="cursor-pointer"
          :items-to-show="3.5"
          :autoplay="5000"
          :wrap-around="true"
          :transition="1500"
          :breakpoints="breakpoints"
        >
          <slide v-for="category in categories" :key="category.id">
            <div
              @click.prevent="positionItemsSection(category)"
              @touchstart.prevent="positionItemsSection(category)"
              class="carousel__item tracking-wider flex w-full items-center justify-center rounded-lg h-8 font-bold text-sm text-white  bg-gray-900"
              :class="category_name == category.name ? 'text-yellow-400 uppercase' : ''"
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
      <section class="transition duration-1000 mt-16" id="section">
        <div class="flex flex-col min-h-screen" :id="category.name" v-for="category in categories" :key="category.name">
          <div class="flex items-center justify-center p-3 text-2xl font-bold">
            <h4 class="category-name relative uppercase">
              {{ category.name }}
            </h4>
          </div>

          <div class="items flex flex-row items-center justify-between flex-wrap p-3">
            <div class="card w-48 shadow-lg rounded-lg relative mb-3" v-for="item in category.items" :key="item.id">
              <div class="image">
                <img :src="require(`@/assets/images/${item.image}`)" class="rounded-t-lg h-32 md:h-40 lg:h-52 w-full" alt="" />
              </div>
              <div class="details flex flex-col items-start justify-around p-1 mb-10">
                <div class="item-name">
                  <h5 class="font-medium text-lg">{{ item.name }}</h5>
                </div>
              </div>
              <div class="flex flex-row justify-around w-full absolute bottom-0">
                <button
                  class="rounded mr-1 w-1/2 border-2 border-gray-900  focus:outline-none hover:outline-none py-1 font-bold text-sm text-gray-900"
                >
                  &#8377; {{ item.price }}
                </button>
                <button
                  class="rounded ml-1 w-1/2 bg-gray-900 hover:bg-gray-800 focus:outline-none hover:outline-none py-1 font-medium text-sm text-white"
                  @click.prevent="goToItemDetails(item.id)"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
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
        price: "25",
        image: "cap-one.jpg",
      },
      {
        id: 1,
        name: "Stitchings Two",
        price: "60",
        image: "cap-one.jpg",
      },
      {
        id: 2,
        name: "Stitchings Three",
        price: "5",
        image: "cap-one.jpg",
      },
      {
        id: 3,
        name: "Stitchings Four",
        price: "100",
        image: "cap-one.jpg",
      },
      {
        id: 4,
        name: "Stitchings Five",
        price: "25",
        image: "cap-one.jpg",
      },
      {
        id: 5,
        name: "Stitchings Six",
        price: "75",
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
        price: "25",
        image: "cap-one.jpg",
      },
      {
        id: 7,
        name: "Crochets Two",
        price: "60",
        image: "cap-one.jpg",
      },
      {
        id: 8,
        name: "Crochets Three",
        price: "5",
        image: "cap-one.jpg",
      },
      {
        id: 9,
        name: "Crochets Four",
        price: "100",
        image: "cap-one.jpg",
      },
      {
        id: 10,
        name: "Crochets Five",
        price: "25",
        image: "cap-one.jpg",
      },
      {
        id: 11,
        name: "Crochets Six",
        price: "75",
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
        price: "25",
        image: "cap-one.jpg",
      },
      {
        id: 13,
        name: "Pants Two",
        price: "60",
        image: "cap-one.jpg",
      },
      {
        id: 14,
        name: "Pants Three",
        price: "5",
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
        price: "25",
        image: "cap-one.jpg",
      },
      {
        id: 16,
        name: "Shirts Two",
        price: "60",
        image: "cap-one.jpg",
      },
      {
        id: 17,
        name: "Shirts Three",
        price: "5",
        image: "cap-one.jpg",
      },
      {
        id: 18,
        name: "Shirts Four",
        price: "100",
        image: "cap-one.jpg",
      },
      {
        id: 19,
        name: "Shirts Five",
        price: "25",
        image: "cap-one.jpg",
      },
      {
        id: 20,
        name: "Shirts Six",
        price: "75",
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
        price: "25",
        image: "cap-one.jpg",
      },
      {
        id: 22,
        name: "Trousers Two",
        price: "60",
        image: "cap-one.jpg",
      },
      {
        id: 23,
        name: "Trousers Three",
        price: "5",
        image: "cap-one.jpg",
      },
      {
        id: 24,
        name: "Trousers Four",
        price: "100",
        image: "cap-one.jpg",
      },
      {
        id: 25,
        name: "Trousers Five",
        price: "25",
        image: "cap-one.jpg",
      },
      {
        id: 26,
        name: "Trousers Six",
        price: "75",
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
        price: "25",
        image: "cap-one.jpg",
      },
      {
        id: 28,
        name: "Inners Two",
        price: "60",
        image: "cap-one.jpg",
      },
      {
        id: 29,
        name: "Inners Three",
        price: "5",
        image: "cap-one.jpg",
      },
    ],
  },
];

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

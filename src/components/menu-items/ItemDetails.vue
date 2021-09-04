<template>
  <header-component></header-component>

  <!-- LHS -->
  <section class="top min-h-no-header w-full md:w-1/2 flex flex-col">
    <div class="w-full h-60 sm:h-72">
      <img :src="item_detail.image" class="w-full h-full" alt="" />
    </div>

    <div class="p-2">
      <div class="text-xl font-bold">
        {{ item_detail.name }}
      </div>
      <div class="text-xl font-bold mt-1">&#8377; {{ item_detail.price }}</div>

      <div class="mt-1 flex items-center">
        <span class="text-lg font-bold mr-2"> To Buy Contact On: </span>
        <a :href="`https://api.whatsapp.com/send?phone=${+919731735035}`" target="_blank" class="mr-2">
          <fa :icon="['fab', 'whatsapp']" class="text-2xl text-gray-900"> </fa>
        </a>
        <a href="https://www.instagram.com/creativity_storee/" target="_blank">
          <fa :icon="['fab', 'instagram']" class="text-2xl text-gray-900"> </fa>
        </a>
      </div>
    </div>
    <!-- Related Products -->
    <div class="w-full mt-10" v-if="false">
      <div class="flex items-center justify-start p-2 text-md font-medium">
        <h4 class="category-name">
          Related Products
        </h4>
      </div>
      <div class="items flex flex-row items-center justify-between overflow-x-scroll p-1 mb-5">
        <div
          class="card flex-none w-48 shadow-lg rounded-lg relative ml-1 mr-1"
          v-for="item in categories[0].items"
          :key="item.id"
        >
          <div class="image">
            <img :src="require(`@/assets/images/${item.image}`)" class="rounded-t-lg h-32 w-full" alt="" />
          </div>
          <div class="details flex flex-col items-start justify-around p-1 mb-10">
            <div class="item-name">
              <h5 class="font-medium text-sm">{{ item.name }}</h5>
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
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const items = [
  {
    id: 0,
    name: "Stitchings One",
    price: "25",
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
    price: "60",
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
    price: "5",
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
    price: "100",
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
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    let item_detail = ref([]);

    let showSelectedImage = (image) => {
      item_detail.value.image = image.image;
    };

    let goToItemDetails = (item_id) => {
      router.push({ name: "Item Details", params: { id: item_id } });
      // let item_id = route.params.id;
      for (let item of items) {
        if (item.id == item_id) {
          item_detail.value = item;
        }
      }
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
      categories,
      item_detail,
      goToItemDetails,
      showSelectedImage,
    };
  },
};
</script>

<style scoped>
.carousel__slide {
  padding: 2px;
}

.w-48 {
  width: calc(50% - 2%);
}

.flex-no-wrap {
  flex-wrap: nowrap;
}
</style>

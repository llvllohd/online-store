<template>
  <header-component></header-component>

  <!-- LHS -->
  <section class="top min-h-no-header w-full md:w-1/2 flex flex-col items-center overflow-y-scroll">
    <div class="w-full sm:w-1/2 bg-red-400">
      <img
        :src="item_detail.image_file"
        class="w-full h-full"
        alt=""
        v-if="item_detail.image_file && item_detail.image_file.length > 0"
      />
      <img :src="require(`@/assets/images/no-image.png`)" class="w-full h-full" alt="" v-else />
    </div>

    <div class="p-2 w-full sm:w-1/2">
      <div class="text-xl font-bold">
        {{ item_detail.name }}
      </div>
      <p class="text text-base text-gray-700 mt-2">
        {{ item_detail.description }}
      </p>

      <div class="flex mt-2">
        <div class="text-lg font-bold  mr-3" :class="item_detail.on_offer ? 'text-red-500 line-through' : ''">
          &#8377; {{ item_detail.price }}
        </div>
        <div class="text-xl font-bold" v-if="item_detail.on_offer">&#8377; {{ item_detail.offer_price }}</div>
      </div>

      <div class="mt-2 flex items-center">
        <span class="text-lg font-bold mr-2"> To Buy Contact On: </span>
        <a :href="`https://api.whatsapp.com/send?phone=${+919731735035}`" target="_blank" class="mr-2">
          <fa :icon="['fab', 'whatsapp']" class="text-2xl text-gray-900"> </fa>
        </a>
        <a href="https://www.instagram.com/creativity_storee/" target="_blank">
          <fa :icon="['fab', 'instagram']" class="text-2xl text-gray-900"> </fa>
        </a>
      </div>
    </div>

    <div class="mt-3 w-full sm:w-1/2">
      <button
        class="rounded w-full bg-gray-900 hover:bg-gray-800 focus:outline-none hover:outline-none p-2 font-medium text-base sm:text-lg text-white"
        @click.prevent="goToItemDetails(item.id)"
      >
        Add to Cart
      </button>
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
import "vue3-carousel/dist/carousel.css";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Menu Items",
  components: {
    HeaderComponent,
    RightHandSide,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const item_detail = ref([]);

    const menuItemId = computed(() => route.query.menuItemId);

    onMounted(() => {
      if (menuItemId.value) {
        store.dispatch("menuItems/getMenuItemById", menuItemId.value).then((res) => {
          if (res.data.status) {
            item_detail.value = res.data.data;
          }
        });
      }
    });

    return {
      item_detail,
      menuItemId,
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

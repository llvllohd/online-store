<template>
  <section class="fixed top-10 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center z-10 bg-gray-500 bg-opacity-95">
    <section class="relative w-4/5 lg:w-3/5 flex flex-col items-center rounded-b rounded-t bg-white">
      <div class=" w-full absolute flex items-center justify-end" style="top:-30px" @click.prevent="closeItemDetail()">
        <fa :icon="['fa', 'times-circle']" class="text-2xl text-gray-900"> </fa>
      </div>
      <div class="w-full h-60 md:h-80" v-if="true">
        <img
          :src="item_detail.image_file"
          class="w-full h-full rounded-t"
          alt=""
          v-if="item_detail.image_file && item_detail.image_file.length > 0"
        />
        <img :src="require(`@/assets/images/no-image.png`)" class="w-full h-full" alt="" v-else />
      </div>

      <div class="p-2 w-full">
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
          <span class="text-lg font-bold mr-2"> Contact : </span>
          <a :href="`https://api.whatsapp.com/send?phone=${+919731735035}`" target="_blank" class="mr-2">
            <fa :icon="['fab', 'whatsapp']" class="text-2xl text-gray-900"> </fa>
          </a>
          <a href="https://www.instagram.com/creativity_storee/" target="_blank">
            <fa :icon="['fab', 'instagram']" class="text-2xl text-gray-900"> </fa>
          </a>
        </div>
      </div>

      <div class="mt-3 w-full">
        <button
          class="rounded w-full bg-gray-900 hover:bg-gray-800 focus:outline-none hover:outline-none p-2 font-medium text-base sm:text-lg text-white"
          @click.prevent="addToCart(item_detail)"
        >
          Add to Cart
        </button>
      </div>
    </section>
  </section>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { ref } from "vue";
import { useStore } from "vuex";
import useToast from "@/hooks/useToast";

export default {
  name: "Menu Items",
  props: {
    selectedItem: {
      type: Object,
      required: true,
    },
  },
  components: {},
  setup(props, context) {
    const store = useStore();
    const item_detail = ref([]);
    const isSubmitting = ref(false);
    item_detail.value = props.selectedItem ? props.selectedItem : [];

    const closeItemDetail = () => {
      context.emit("closeItemDetail");
    };

    const addToCart = (item) => {
      store
        .dispatch("cart/addToCart", {
          menu_item_id: item.id,
          quantity: 1,
        })
        .then((res) => {
          isSubmitting.value = false;
          if (res.data.status) {
            useToast("Item Added to Cart.", "success");
            closeItemDetail();
          } else {
            useToast(res.data.message, "danger");
          }
        });
    };

    return {
      item_detail,
      closeItemDetail,
      addToCart,
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

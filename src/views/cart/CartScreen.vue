<template>
  <div>
    <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
      <div class="p-1 sm:p-3 w-full">
        <!-- Back button & title -->
        <TitleScreen title="Cart" />

        <div class="overflow-x-auto">
          <table class="table-auto w-full">
            <tbody>
              <tr v-for="item in cartDetail.cart_items" :key="item.id" class="border-t border-b">
                <td class="p-2 h-20 w-20">
                  <img :src="item.item_image" class="w-full h-full" alt="" />
                </td>

                <td class="p-2">
                  <div class="">
                    {{ item.menu_item_name }}
                  </div>
                </td>

                <td class="p-2 text-center">
                  <div class="">
                    {{ item.quantity }}
                  </div>
                </td>

                <td class="p-2 text-right">
                  <div class="">
                    {{ item.total_price }}
                  </div>
                </td>

                <td class="p-2 text-center" @click="removeCartItem(item)">
                  <div class="cursor-pointer">
                    <fa :icon="['fa', 'times']" class="text-lg text-gray-900"> </fa>
                  </div>
                </td>
              </tr>
              <!-- Sub Total -->
              <tr class="border-b">
                <th colspan="1"></th>
                <th colspan="2" class="p-1">
                  <div class="p-1 text-left">
                    Sub Total
                  </div>
                </th>
                <th colspan="1" class="p-1">
                  <div class="p-1 text-right">
                    {{ cartDetail.sub_total }}
                  </div>
                </th>
                <th colspan="1"></th>
              </tr>
              <!-- Delivery Charge -->
              <tr class="border-b">
                <th colspan="1"></th>
                <th colspan="2" class="p-1">
                  <div class="p-1 text-left">
                    Delivery Charge
                  </div>
                </th>
                <th colspan="1" class="p-1">
                  <div class="p-1 text-right">
                    {{ cartDetail.delivery_charges }}
                  </div>
                </th>
                <th colspan="1"></th>
              </tr>
              <!-- Total -->
              <tr class="border-b">
                <th colspan="1"></th>
                <th colspan="2" class="p-1">
                  <div class="p-1 text-left">
                    Total
                  </div>
                </th>
                <th colspan="1" class="p-1">
                  <div class="p-1 text-right">
                    {{ cartDetail.total_amount }}
                  </div>
                </th>
                <th colspan="1"></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!-- Floating Button -->
    <floating-button :floatingButtonText="'Checkout'" :isLink="true" :link="'Checkout'"></floating-button>
  </div>
</template>

<script>
import FloatingButton from "@/common/FloatingButton";
import useToast from "@/hooks/useToast";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Cart",
  components: { FloatingButton },

  setup() {
    const router = useRouter();
    const store = useStore();
    const cartDetail = ref([]);

    const removeCartItem = (item) => {
      store.dispatch("cart/removeCartItem", item.id).then((res) => {
        if (res.data.status) {
          if (res.data.data.cart_items && res.data.data.cart_items.length > 0) {
            useToast("Item Removed From Cart.", "success");
            cartDetail.value = res.data.data;
          } else {
            useToast(res.data.message, "danger");
            router.push({ name: "Menu Items" });
          }
        } else {
          useToast(res.data.message, "danger");
        }
      });
    };

    onMounted(() => {
      store.dispatch("cart/getCartDetail").then((res) => {
        if (res.data.status) {
          cartDetail.value = res.data.data;
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    return {
      router,
      cartDetail,
      removeCartItem,
    };
  },
};
</script>

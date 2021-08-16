<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <div class="p-1 sm:p-3 w-full">
      <div class="flex justify-center text-3xl font-bold p-3 mb-3">
        Categories
      </div>

      <!-- Add Category -->
      <div class="flex items-center justify-end mb-2">
        <router-link
          :to="{ name: 'Add Category' }"
          class=" text-white bg-gray-900 hover:bg-gray-800 font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          ADD
        </router-link>
      </div>

      <table class="table-auto w-full overflow-x-auto">
        <thead>
          <tr>
            <th class="text-left border border-gray-400 p-2">Name</th>
            <th class="text-left border border-gray-400 p-2">Description</th>
            <th class="text-left border border-gray-400 p-2">Visible</th>
            <th class="text-center border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td class="border border-gray-400 p-2">{{ category.name }}</td>
            <td class="border border-gray-400 p-2">{{ category.description }}</td>
            <td class="border border-gray-400 p-2">{{ category.is_visible == 1 ? "Yes" : "No" }}</td>
            <td class="text-center border border-gray-400 p-2">
              <div class="r cursor-pointer">
                <router-link :to="{ name: 'Add Category', query: { categoryId: category.id } }">
                  <fa :icon="['fa', 'edit']" class="text-gray-900 text-sm mr-2"> </fa>
                </router-link>
                <fa :icon="['fa', 'trash']" class="text-gray-900 text-sm ml-2" @click.prevent="openAlert(category.id)"> </fa>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <!-- RHS -->
  <section>
    <right-hand-side></right-hand-side>
  </section>

  <!-- Alert Modal -->
  <alert-screen
    :is-alert="is_alert"
    :item-id="item_id"
    @confirm-alert="confirmAlert"
    :delete-Action="deleteCategory"
  ></alert-screen>
</template>

<script>
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import RightHandSide from "@/components/common/RightHandSide";
import AlertScreen from "@/components/common/AlertScreen.vue";
import useToast from "@/hooks/useToast";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Categories",
  components: { HeaderComponent, RightHandSide, AlertScreen },

  setup() {
    const store = useStore();
    const categories = ref([]);
    const is_alert = ref(false);
    const item_id = ref("");

    const openAlert = (categoryId) => {
      is_alert.value = true;
      item_id.value = categoryId;
    };

    const confirmAlert = (value) => {
      if (!value) {
        is_alert.value = value;
      }
    };

    const deleteCategory = (categoryId) => {
      store.dispatch("categories/deleteCategory", categoryId).then((res) => {
        if (res.data.status) {
          categories.value = res.data.data;
          is_alert.value = false;
          useToast(res.data.message, "success");
        } else {
          useToast(res.data.message, "danger");
        }
      });
    };

    onMounted(() => {
      store.dispatch("categories/getCategories").then((res) => {
        if (res.data.status) {
          categories.value = res.data.data;
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    return {
      is_alert,
      openAlert,
      confirmAlert,
      item_id,
      categories,
      deleteCategory,
    };
  },
};
</script>

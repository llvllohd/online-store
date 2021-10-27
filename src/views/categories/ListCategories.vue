<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <div class="p-1 sm:p-3 w-full">
      <!-- Back button & title -->
      <TitleScreen title="Categories" />

      <!-- Add Category -->
      <div class="flex items-center justify-end mb-2">
        <router-link
          :to="{ name: 'Add Category' }"
          class=" text-white bg-gray-900 hover:bg-gray-800 font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          ADD
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
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
                <div class="cursor-pointer">
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
    </div>
  </section>
  <!-- RHS -->
  <section>
    <right-hand-side></right-hand-side>
  </section>

  <!-- Alert Modal -->
  <alert-screen :is-alert="is_alert" :item-id="item_id" @confirm-alert="confirmAlert" :delete-Action="deleteCategory">
    <template v-slot:header>
      <div class="flex items-center justify-center bg-red-500 rounded-full w-5 h-5 mr-2">
        <fa :icon="['fa', 'exclamation']" class="text-white text-xs sm:text-sm"></fa>
      </div>
      Delete Alert
    </template>
    <template v-slot:content>
      Do you want to Delete this ?
    </template>
  </alert-screen>
</template>

<script>
import AlertScreen from "@/common/AlertScreen.vue";
import useToast from "@/hooks/useToast";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Categories",
  components: { AlertScreen },

  setup() {
    const store = useStore();
    const router = useRouter();
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
      router,
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

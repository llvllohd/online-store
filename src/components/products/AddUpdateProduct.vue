<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <div class="p-3 w-full sm:max-w-md">
      <div class="flex justify-center text-3xl font-bold p-5">
        Add Product
      </div>

      <form @submit="submitForm" class="shadow-md rounded px-5 p-5">
        <!-- Name -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            @input="name.handleChange"
            @blur="name.handleBlur"
            v-model="name.value"
            class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="name.meta.touched && !name.meta.valid ? 'border border-red-500' : ''"
            id="name"
          />
          <span v-if="name.meta.touched && !name.meta.valid" class="text-red-500 text-xs italic">
            {{ name.errorMessage || "Field is required" }}
          </span>
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Description
          </label>
          <input
            type="text"
            placeholder="Description"
            @input="description.handleChange"
            @blur="description.handleBlur"
            v-model="description.value"
            class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="description.meta.touched && !description.meta.valid ? 'border border-red-500' : ''"
          />
          <span v-if="description.meta.touched && !description.meta.valid" class=" text-red-500 text-xs italic">
            {{ description.errorMessage || "Field is required" }}
          </span>
        </div>

        <!-- Select Category -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Select Category
          </label>
          <select
            @change="OnChangeSelect($event)"
            class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option class="py-1" :value="category.value" v-for="category in category_options.value" :key="category.value">
              {{ category.text }}</option
            >
          </select>
        </div>

        <!-- Is Visible -->
        <div class="flex items-center mb-4">
          <div class="flex w-1/2">
            <label class="flex items-center">
              <input type="checkbox" v-model="is_visible.value" class="form-checkbox rounded" />
              <span class="ml-2">Visible</span>
            </label>
          </div>

          <!-- Is Available -->
          <div class="flex w-1/2">
            <label class="flex items-center">
              <input type="checkbox" v-model="is_available.value" class="form-checkbox rounded" />
              <span class="ml-2">Available</span>
            </label>
          </div>
        </div>

        <!-- Price -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            placeholder="Price"
            @input="price.handleChange"
            @blur="price.handleBlur"
            v-model="price.value"
            class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="price.meta.touched && !price.meta.valid ? 'border border-red-500' : ''"
            id="name"
          />
          <span v-if="price.meta.touched && !price.meta.valid" class="text-red-500 text-xs italic">
            {{ price.errorMessage || "Field is required" }}
          </span>
        </div>

        <!-- On Offer -->
        <div class="flex mb-4">
          <label class="flex items-center">
            <input type="checkbox" v-model="on_offer.value" class="form-checkbox rounded" />
            <span class="ml-2">On Offer</span>
          </label>
        </div>

        <!-- Offer Price -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Offer Price
          </label>

          <input
            type="number"
            placeholder="Offer Price"
            @input="offer_price.handleChange"
            @blur="offer_price.handleBlur"
            v-model="offer_price.value"
            class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="offer_price.meta.touched && !offer_price.meta.valid ? 'border border-red-500' : ''"
            id="name"
          />
          <span v-if="offer_price.meta.touched && !offer_price.meta.valid" class="text-red-500 text-xs italic">
            {{ offer_price.errorMessage || "Field is required" }}
          </span>
        </div>

        <!-- Image -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Select Image
          </label>

          <div class="shadow rounded" v-if="image_file.value && image_file.value.length > 0">
            <img class="h-40 w-full object-cover rounded" :src="image_file.value" alt="image" />
          </div>
          <div
            :class="image_file.meta.touched && !image_file.meta.valid ? 'border border-red-500' : ''"
            class="shadow rounded"
            v-else
          >
            <img class="h-40 w-full object-contain rounded" src="@/assets/images/no-photos.png" alt="image" />
          </div>
          <span v-if="image_file.meta.touched && !image_file.meta.valid" class="text-red-500 text-xs italic">
            {{ image_file.errorMessage || "Field is required" }}
          </span>
          <!-- Upload Button -->
          <div
            class="flex items-center justify-center mt-2 mb-4 border border-gray-400 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
          >
            <div class="absolute">
              <div class="flex items-center justify-center">
                <fa :icon="['fa', 'upload']" class="text-gray-400 mr-3"> </fa>
                <span class=" text-gray-400 font-medium">{{ image_file && image_file.length > 0 ? "Change" : "Browse" }}</span>
              </div>
            </div>
            <input @change="onFileChange" type="file" class="h-full w-full opacity-0" name="" />
          </div>
        </div>

        <!-- Add Product -->
        <div class="flex items-center">
          <button
            :disabled="isSubmitting ? true : false"
            type="submit"
            class="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :class="[
              formMeta.valid ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-500 hover:bg-gray-500',
              isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer',
            ]"
          >
            <fa :icon="['fa', 'circle-notch']" class="text-white text-xs animate-spin mr-2" v-if="isSubmitting"> </fa>
            ADD
          </button>
        </div>
      </form>

      <p class="text-center text-gray-500 text-xs p-3">
        &copy;2021 Fatimas. All rights reserved.
      </p>
    </div>
  </section>
  <!-- RHS -->

  <section>
    <right-hand-side></right-hand-side>
  </section>
</template>

<script>
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import RightHandSide from "@/components/common/RightHandSide";
import useToast from "@/hooks/useToast";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useForm, useField } from "vee-validate";

export default {
  name: "Register",
  components: { HeaderComponent, RightHandSide },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isSubmitting = ref(false);
    const { meta: formMeta, handleSubmit } = useForm();
    const name = reactive(useField("name", "required"));
    const description = reactive(useField("description", "required"));
    const is_visible = reactive(useField("is_visible", "", { initialValue: true }));
    const is_available = reactive(useField("is_available", "", { initialValue: true }));
    const price = reactive(useField("price", "required"));
    const on_offer = reactive(useField("on_offer", "", { initialValue: false }));
    const offer_price = reactive(useField("offer_price", "conditional:on_offer"));
    const image_file = reactive(useField("image_file[]", "required"));
    const image_filee = ref([]);
    const selected_category = ref("");
    const category_options = reactive([]);

    const OnChangeSelect = (event) => {
      console.log(event)
    };

    const onFileChange = (e) => {
      let file = e.target.files || e.dataTransfer.files;
      image_filee.value = file;
      if (file && file[0]) {
        image_file.value = URL.createObjectURL(file[0]);
      }
    };

    const submitForm = handleSubmit((formValues) => {
      isSubmitting.value = true;
      if (route.query.categoryId) {
        formValues.category_id = 1;
        formValues.image_file = image_filee;
        store.dispatch("products/addProduct", formValues).then((res) => {
          isSubmitting.value = false;
          if (res.data.status) {
            useToast(res.data.message, "success");
            router.push({ name: "Products" });
          } else {
            useToast(res.data.message, "danger");
          }
        });
      } else {
        formValues.category_id = 1;
        formValues.image_file = image_filee;
        store.dispatch("products/addProduct", formValues).then((res) => {
          isSubmitting.value = false;
          if (res.data.status) {
            useToast(res.data.message, "success");
            router.push({ name: "Products" });
          } else {
            useToast(res.data.message, "danger");
          }
        });
      }
    });

    onMounted(() => {
      store.dispatch("categories/getCategoriesList").then((res) => {
        if (res.data.status) {
          category_options.value = res.data.data;
        }
      });

      if (route.query.categoryId) {
        store.dispatch("categories/getCategoryById", route.query.categoryId).then((res) => {
          if (res.data.status) {
            name.value = res.data.data.name;
            description.value = res.data.data.description;
            is_visible.value = res.data.data.is_visible == 1 ? true : false;
            is_available.value = res.data.data.is_available == 1 ? true : false;
            price.value = res.data.data.price;
          } else {
            name.value = "";
            description.value = "";
            is_visible.value = true;
            is_available.value = true;
            price.value = "";
          }
        });
      }
    });

    return {
      isSubmitting,
      name,
      description,
      is_visible,
      is_available,
      price,
      on_offer,
      offer_price,
      onFileChange,
      image_file,
      image_filee,
      category_options,
      formMeta,
      OnChangeSelect,
      submitForm,
      selected_category,
    };
  },
};
</script>

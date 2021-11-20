<template>
  <div>
    <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
      <div class="p-3 w-full sm:max-w-md">
        <!-- Back button & title -->
        <TitleScreen :title="productId ? 'Update Product' : 'Add Product'" />

        <form @submit="submitForm" class="shadow-md rounded px-5 p-5">
          <!-- Name -->
          <div class="mb-3">
            <BaseInput type="text" label="Name" v-model="name.value" :error="name.errorMessage" />
          </div>

          <!-- Description -->
          <div class="mb-3">
            <BaseInput type="text" label="Description" v-model="description.value" :error="description.errorMessage" />
          </div>

          <!-- Select Category -->
          <div class="mb-3">
            <BaseSelect
              label="Select Category"
              v-model="category_id.value"
              :options="category_options.value"
              :error="category_id.errorMessage"
            />
          </div>

          <!-- Is Visible & Available -->
          <div class="flex items-center mb-3">
            <div class="flex items-center w-1/2">
              <BaseCheckbox label="Visible" v-model="is_visible.value" />
            </div>

            <div class="flex items-center w-1/2">
              <BaseCheckbox label="Available" v-model="is_available.value" />
            </div>
          </div>

          <!-- Price -->
          <div class="mb-3">
            <BaseInput type="number" label="Price" v-model="price.value" :error="price.errorMessage" />
          </div>

          <!-- On Offer -->
          <div class="flex items-center mb-3">
            <BaseCheckbox label="On Offer" v-model="on_offer.value" />
          </div>

          <!-- Offer Price -->
          <div class="mb-3">
            <BaseInput type="number" label="Offer Price" v-model="offer_price.value" :error="offer_price.errorMessage" />
          </div>

          <!-- Image -->
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">
              Select Image
            </label>

            <div class="shadow rounded" v-if="selected_image_file && selected_image_file.length > 0">
              <img class="h-40 w-full object-contain rounded" :src="selected_image_file" alt="image" />
            </div>
            <div :class="image_file.meta.touched && !image_file.meta.valid ? 'border border-red-500' : ''" class="shadow rounded" v-else>
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
          <BaseButton :label="productId ? 'Update' : 'ADD'" :clickMethod="submitForm" :formMeta="formMeta" :isSubmitting="isSubmitting" />
        </form>

        <p class="text-center text-gray-500 text-xs p-3">
          &copy;2021 Fatimas. All rights reserved.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import useToast from "@/hooks/useToast";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useForm, useField } from "vee-validate";

export default {
  name: "Register",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isSubmitting = ref(false);
    const { meta: formMeta, handleSubmit } = useForm();
    const category_options = reactive([]);
    const name = reactive(useField("name", "required"));
    const description = reactive(useField("description", "required"));
    const category_id = reactive(useField("category_id", "required", { initialValue: "" }));
    const is_visible = reactive(useField("is_visible", "", { initialValue: true }));
    const is_available = reactive(useField("is_available", "", { initialValue: true }));
    const price = reactive(useField("price", "required"));
    const on_offer = reactive(useField("on_offer", "", { initialValue: false }));
    const offer_price = reactive(useField("offer_price", "conditional:on_offer", { initialValue: "" }));
    const image_file = reactive(useField("image_file", imageRequired));
    const selected_image_file = ref([]);

    function imageRequired() {
      if ((!productId.value && image_file.value) || productId.value) {
        return true;
      }
      return "This is required";
    }

    const onFileChange = (e) => {
      let file = e.target.files || e.dataTransfer.files;
      image_file.value = file[0];
      if (file && file[0]) {
        selected_image_file.value = URL.createObjectURL(file[0]);
      }
    };

    const productId = computed(() => route.query.productId);

    const submitForm = handleSubmit((formValues) => {
      isSubmitting.value = true;
      if (productId.value) {
        formValues.product_id = productId.value;
        formValues.is_visible = is_visible.value ? 1 : 0;
        formValues.is_available = is_available.value ? 1 : 0;
        formValues.on_offer = on_offer.value ? 1 : 0;
        store.dispatch("products/updateProduct", formValues).then((res) => {
          isSubmitting.value = false;
          if (res.data.status) {
            useToast(res.data.message, "success");
            router.push({ name: "Products" });
          } else {
            useToast(res.data.message, "danger");
          }
        });
      } else {
        formValues.is_visible = is_visible.value ? 1 : 0;
        formValues.is_available = is_available.value ? 1 : 0;
        formValues.on_offer = on_offer.value ? 1 : 0;
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

      if (productId.value) {
        store.dispatch("products/getProductById", productId.value).then((res) => {
          if (res.data.status) {
            category_id.value = res.data.data.category_id;
            name.value = res.data.data.name;
            description.value = res.data.data.description;
            is_visible.value = res.data.data.is_visible == 1 ? true : false;
            is_available.value = res.data.data.is_available == 1 ? true : false;
            price.value = res.data.data.price;
            on_offer.value = res.data.data.on_offer == 1 ? true : false;
            offer_price.value = res.data.data.offer_price;
            selected_image_file.value = res.data.data.image_file;
          }
        });
      }
    });

    return {
      router,
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
      selected_image_file,
      category_options,
      formMeta,
      submitForm,
      category_id,
      productId,
    };
  },
};
</script>

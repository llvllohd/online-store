<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <div class="p-3 w-full sm:max-w-md">
      <div class="flex justify-center text-3xl font-bold p-5">
        Add Category
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

        <!-- Is Visible -->
        <div class="flex mb-4">
          <label class="flex items-center">
            <input type="checkbox" v-model="is_visible.value" class="form-checkbox rounded" />
            <span class="ml-2">Visible</span>
          </label>
        </div>

        <!-- Price -->
        <!-- <div class="mb-4">
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
        </div> -->

        <!-- Add Category -->
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

    // const price = reactive(useField("price", "required"));

    const submitForm = handleSubmit((formValues) => {
      isSubmitting.value = true;
      if (route.query.categoryId) {
        formValues.category_id = route.query.categoryId;
        store.dispatch("categories/updateCategory", formValues).then((res) => {
          isSubmitting.value = false;
          if (res.data.status) {
            useToast(res.data.message, "success");
            router.push({ name: "Categories" });
          } else {
            useToast(res.data.message, "danger");
          }
        });
      } else {
        store.dispatch("categories/addCategory", formValues).then((res) => {
          isSubmitting.value = false;
          if (res.data.status) {
            useToast(res.data.message, "success");
            router.push({ name: "Categories" });
          } else {
            useToast(res.data.message, "danger");
          }
        });
      }
    });

    onMounted(() => {
      if (route.query.categoryId) {
        store.dispatch("categories/getCategoryById", route.query.categoryId).then((res) => {
          if (res.data.status) {
            name.value = res.data.data.name;
            description.value = res.data.data.description;
            is_visible.value = res.data.data.is_visible == 1 ? true : false;
            // price.value = res.data.data.price;
          } else {
            name.value = "";
            description.value = "";
            is_visible.value = true;
            // price.value = "";
          }
        });
      }
    });

    return {
      isSubmitting,
      name,
      description,
      is_visible,
      // price,
      formMeta,
      submitForm,
    };
  },
};
</script>

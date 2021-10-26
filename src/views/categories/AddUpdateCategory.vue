<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <div class="p-3 w-full sm:max-w-md">
      <!-- Back button & title -->
      <section class="w-full flex items-center justify-between text-xl sm:text-2xl font-bold p-3 mb-3">
        <div class="flex items-center w-1/6">
          <span
            class="flex items-center justify-center sm:cursor-pointer rounded-full h-7 w-7 sm:h-9 sm:w-9 border hover:border-gray-900"
            @click.prevent="router.go(-1)"
          >
            <fa :icon="['fa', 'arrow-left']" class="text-sm sm:text-lg text-gray-900"> </fa>
          </span>
        </div>
        <div class="flex items-center justify-center w-4/6 ">{{ categoryId ? "Update Category" : "Add Category" }}</div>
        <div class="w-1/6"></div>
      </section>

      <form @submit="submitForm" class="shadow-md rounded px-5 p-5">
        <!-- Name -->
        <div class="mb-3">
          <BaseInput type="text" label="Name" v-model="name.value" :error="name.errorMessage" />
        </div>

        <!-- Description -->
        <div class="mb-3">
          <BaseInput type="text" label="Description" v-model="description.value" :error="description.errorMessage" />
        </div>

        <!-- Is Visible -->
        <div class="flex items-center mb-3">
          <BaseCheckbox label="Visible" v-model="is_visible.value" />
        </div>

        <!-- Add Category -->
        <BaseButton :label="categoryId ? 'Update' : 'ADD'" :clickMethod="submitForm" :formMeta="formMeta" :isSubmitting="isSubmitting" />
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
import useToast from "@/hooks/useToast";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useForm, useField } from "vee-validate";

export default {
  name: "Add Category",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isSubmitting = ref(false);
    const { meta: formMeta, handleSubmit } = useForm();
    const name = reactive(useField("name", "required"));
    const description = reactive(useField("description", "required"));
    const is_visible = reactive(useField("is_visible", "", { initialValue: true }));

    const categoryId = computed(() => route.query.categoryId);

    const submitForm = handleSubmit((formValues) => {
      isSubmitting.value = true;
      if (categoryId.value) {
        formValues.category_id = categoryId.value;
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
      if (categoryId.value) {
        store.dispatch("categories/getCategoryById", categoryId.value).then((res) => {
          if (res.data.status) {
            name.value = res.data.data.name;
            description.value = res.data.data.description;
            is_visible.value = res.data.data.is_visible == 1 ? true : false;
          } else {
            name.value = "";
            description.value = "";
            is_visible.value = true;
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
      categoryId,
      formMeta,
      submitForm,
    };
  },
};
</script>

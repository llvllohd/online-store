<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-center">
    <div class="h-full p-3 w-full sm:max-w-md">
      <div class="flex justify-center text-3xl font-bold p-5">
        Change Password
      </div>

      <form @submit="submitForm" class="shadow-md rounded px-5 p-5">
        <!-- Password -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            type="text"
            placeholder="Password"
            @input="passwordField.handleChange"
            @blur="passwordField.handleBlur"
            v-model="passwordField.value"
            class="shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="passwordField.meta.touched && !passwordField.meta.valid ? 'border border-red-500' : ''"
            id="name"
          />
          <span v-if="passwordField.meta.touched && !passwordField.meta.valid" class="text-red-500 text-xs italic">
            {{ passwordField.errorMessage || "Field is required" }}
          </span>
        </div>
        <!-- Confirm Password -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="confirmPassword">
            Confirm Password
          </label>
          <input
            type="text"
            placeholder="Confirm Password"
            @input="confirmPasswordField.handleChange"
            @blur="confirmPasswordField.handleBlur"
            v-model="confirmPasswordField.value"
            class="shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="confirmPasswordField.meta.touched && !confirmPasswordField.meta.valid ? 'border border-red-500' : ''"
            id="name"
          />
          <span v-if="confirmPasswordField.meta.touched && !confirmPasswordField.meta.valid" class="text-red-500 text-xs italic">
            {{ confirmPasswordField.errorMessage || "Field is required" }}
          </span>
        </div>
        <!-- Signup Btn -->
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
            Change Password
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
import { reactive, ref } from "vue";
import useToast from "@/hooks/useToast";
import RightHandSide from "@/components/common/RightHandSide";
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "Register",
  components: { HeaderComponent, RightHandSide },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isSubmitting = ref(false);
    const { meta: formMeta, handleSubmit } = useForm();

    const passwordField = reactive(useField("password", "password"));
    const confirmPasswordField = reactive(useField("confirmPassword", "confirmPassword:password"));

    const submitForm = handleSubmit((formValues) => {
      isSubmitting.value = true;
      formValues.email = route.query.email;
      formValues.token = route.query.token;
      store
        .dispatch("auth/changePassword", {
          email: formValues.email,
          password: formValues.password,
          token: formValues.token,
        })
        .then((res) => {
          isSubmitting.value = false;
          if (res.data.status) {
            useToast(res.data.message, "success");
            router.push({ name: "Menu Items" });
          } else {
            useToast(res.data.message, "danger");
          }
        });
    });

    return {
      isSubmitting,
      passwordField,
      confirmPasswordField,
      formMeta,
      submitForm,
    };
  },
};
</script>

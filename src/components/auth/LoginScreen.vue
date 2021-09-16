<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-center">
    <div class="h-full p-3 w-full sm:max-w-md flex flex-col justify-center">
      <div class="flex justify-center text-3xl font-bold p-5">
        Login
      </div>
      <form @submit="submitForm" class="shadow-md rounded px-5 p-5">
        <!-- Email -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="email">
            Email
          </label>

          <input
            type="email"
            placeholder="Email"
            @input="emailField.handleChange"
            @blur="emailField.handleBlur"
            v-model="emailField.value"
            class="shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="emailField.meta.touched && !emailField.meta.valid ? 'border border-red-500' : ''"
          />
          <span v-if="emailField.meta.touched && !emailField.meta.valid" class=" text-red-500 text-xs italic">
            {{ emailField.errorMessage || "Field is required" }}
          </span>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            type="password"
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
        <!-- Login Btn -->
        <div class="flex items-center justify-center">
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

            Login
          </button>
        </div>

        <router-link
          :to="{ name: 'Forgot Password' }"
          class="text-xs sm:text-sm font-bold  text-blue-500 hover:text-blue-800 flex justify-end p-2"
        >
          Forgot Password?
        </router-link>

        <div class="text-xs sm:text-sm font-bold flex justify-center p-3">
          Dont't Have An Account?
          <router-link :to="{ name: 'Register' }" class="ml-2 text-blue-500 hover:text-blue-800">
            Sign Up
          </router-link>
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
import HeaderComponent from "@/components/common//HeaderComponent.vue";
import { computed, reactive, ref } from "vue";
import useToast from "@/hooks/useToast";
import RightHandSide from "@/components/common/RightHandSide";
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  components: { HeaderComponent, RightHandSide },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isSubmitting = ref(false);
    const { meta: formMeta, handleSubmit } = useForm();
    const emailField = reactive(useField("email", "email"));
    const passwordField = reactive(useField("password", "password"));

    const submitForm = handleSubmit((formValues) => {
      isSubmitting.value = true;
      store.dispatch("auth/login", formValues).then((res) => {
        isSubmitting.value = false;
        if (res.data.status) {
          useToast(res.data.message, "success");
          router.push({ name: "Menu Items" });
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    const isUserLoggedIn = computed(() => store.getters["auth/isUserLoggedIn"]);

    return {
      isSubmitting,
      isUserLoggedIn,
      emailField,
      passwordField,
      formMeta,
      submitForm,
    };
  },
};
</script>

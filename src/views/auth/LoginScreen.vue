<template>
  <div>
    <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-center">
      <div class="h-full p-3 w-full sm:max-w-md flex flex-col justify-center">
        <!-- Back button & title -->
        <TitleScreen title="Login" />
        <form @submit="submitForm" class="shadow-md rounded px-5 p-5">
          <!-- Email -->
          <div class="mb-3">
            <BaseInput type="text" label="Email" v-model="emailField.value" :error="emailField.errorMessage" />
          </div>

          <!-- Password -->
          <div class="mb-3">
            <BaseInput type="password" label="Password" v-model="passwordField.value" :error="passwordField.errorMessage" />
          </div>

          <!-- Login Btn -->
          <BaseButton label="Login" :clickMethod="submitForm" :formMeta="formMeta" :isSubmitting="isSubmitting" />

          <div class="flex justify-end p-3">
            <router-link :to="{ name: 'Forgot Password' }" class="text-xs sm:text-sm font-bold  text-blue-500 hover:text-blue-800 ">
              Forgot Password?
            </router-link>
          </div>

          <div class="text-xs sm:text-sm font-bold flex justify-center">
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
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import useToast from "@/hooks/useToast";
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  components: {},
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

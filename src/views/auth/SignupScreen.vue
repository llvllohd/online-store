<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-center">
    <div class="h-full p-3 w-full sm:max-w-md">
      <div class="flex justify-center text-3xl font-bold p-5">
        Register
      </div>

      <form @submit="submitForm" class="shadow-md rounded px-5 p-5">
        <!-- Name -->
        <div class="mb-3">
          <BaseInput type="text" label="Name" v-model="nameField.value" :error="nameField.errorMessage" />
        </div>

        <!-- Email -->
        <div class="mb-3">
          <BaseInput type="text" label="Email" v-model="emailField.value" :error="emailField.errorMessage" />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <BaseInput type="password" label="Password" v-model="passwordField.value" :error="passwordField.errorMessage" />
        </div>

        <!-- Confirm Password -->
        <div class="mb-3">
          <BaseInput type="password" label="Confirm Password" v-model="confirmPasswordField.value" :error="confirmPasswordField.errorMessage" />
        </div>

        <!-- Signup Btn -->
        <BaseButton label="Register" :clickMethod="submitForm" :formMeta="formMeta" :isSubmitting="isSubmitting" />

        <div class="text-xs sm:text-sm font-bold flex justify-center p-3">
          Already Have An Account?
          <router-link :to="{ name: 'Login' }" class="ml-2 text-blue-500 hover:text-blue-800">
            Sign In
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
import { reactive, ref } from "vue";
import useToast from "@/hooks/useToast";
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const isSubmitting = ref(false);
    const { meta: formMeta, handleSubmit } = useForm();
    const nameField = reactive(useField("name", "required"));
    const emailField = reactive(useField("email", "email"));
    const passwordField = reactive(useField("password", "password"));
    const confirmPasswordField = reactive(useField("confirmPassword", "confirmPassword:password"));

    const submitForm = handleSubmit((formValues) => {
      isSubmitting.value = true;
      store
        .dispatch("auth/register", {
          name: formValues.name,
          type: "user",
          email: formValues.email,
          password: formValues.password,
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
      nameField,
      emailField,
      passwordField,
      confirmPasswordField,
      formMeta,
      submitForm,
    };
  },
};
</script>

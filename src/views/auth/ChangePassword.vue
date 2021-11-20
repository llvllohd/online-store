<template>
  <div>
    <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-center">
      <div class="h-full p-3 w-full sm:max-w-md">
        <!-- Back button & title -->
        <TitleScreen title="Change Password" />

        <form @submit="submitForm" class="shadow-md rounded px-5 p-5">
          <!-- Password -->
          <div class="mb-3">
            <BaseInput type="password" label="Password" v-model="passwordField.value" :error="passwordField.errorMessage" />
          </div>

          <!-- Confirm Password -->
          <div class="mb-3">
            <BaseInput
              type="password"
              label="Confirm Password"
              v-model="confirmPasswordField.value"
              :error="confirmPasswordField.errorMessage"
            />
          </div>

          <!-- Signup Btn -->
          <BaseButton label="Change Password" :clickMethod="submitForm" :formMeta="formMeta" :isSubmitting="isSubmitting" />
        </form>

        <p class="text-center text-gray-500 text-xs p-3">
          &copy;2021 Fatimas. All rights reserved.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import useToast from "@/hooks/useToast";
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "Register",
  components: {},
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

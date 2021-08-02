<template>
  <div class="top h-no-header w-full sm:w-1/2 fixed left-0">
    <div class="h-full flex items-center justify-center overflow-y-auto">
      <div class="h-full p-3 w-full sm:max-w-md">
        <div class="flex justify-center text-3xl font-bold p-5">
          Register
        </div>

        <form @submit="submitForm" class="shadow-md rounded px-5 p-5">
          <!-- Name -->
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              @input="nameField.handleChange"
              @blur="nameField.handleBlur"
              v-model="nameField.value"
              class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              :class="nameField.meta.touched && !nameField.meta.valid ? 'border border-red-500' : ''"
              id="name"
            />
            <span v-if="nameField.meta.touched && !nameField.meta.valid" class="text-red-500 text-xs italic">
              {{ nameField.errorMessage || "Field is required" }}
            </span>
          </div>
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
              class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
              type="passsword"
              placeholder="Password"
              @input="passwordField.handleChange"
              @blur="passwordField.handleBlur"
              v-model="passwordField.value"
              class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
              type="passsword"
              placeholder="Confirm Password"
              @input="confirmPasswordField.handleChange"
              @blur="confirmPasswordField.handleBlur"
              v-model="confirmPasswordField.value"
              class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              :class="confirmPasswordField.meta.touched && !confirmPasswordField.meta.valid ? 'border border-red-500' : ''"
              id="name"
            />
            <span
              v-if="confirmPasswordField.meta.touched && !confirmPasswordField.meta.valid"
              class="text-red-500 text-xs italic"
            >
              {{ confirmPasswordField.errorMessage || "Field is required" }}
            </span>
          </div>
          <!-- Signup Btn -->
          <div class="flex items-center">
            <button
              type="submit"
              class="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              :class="formMeta.valid ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-500 hover:bg-gray-500'"
            >
              Register
            </button>
          </div>

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
    </div>
  </div>

  <right-hand-side></right-hand-side>
</template>

<script>
import { reactive } from "vue";
import RightHandSide from "../../common/RightHandSide";
import { useForm, useField } from "vee-validate";

export default {
  name: "Register",
  components: { RightHandSide },
  setup() {
    const { meta: formMeta, handleSubmit } = useForm();
    const nameField = reactive(useField("name", "required"));
    const emailField = reactive(useField("email", "email"));
    const passwordField = reactive(useField("password", "password"));
    const confirmPasswordField = reactive(useField("confirmPassword", "confirmPassword:password"));

    const submitForm = handleSubmit((formValues) => {
      console.log(formValues);
    });

    return {
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

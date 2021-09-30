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
        <div class="flex items-center justify-center w-4/6 ">{{ addressId ? "Update Address" : "Add Address" }}</div>
        <div class="w-1/6"></div>
      </section>

      <form @submit="submitForm" class="shadow-md rounded px-5 p-5">
        <!-- Address -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            @input="address.handleChange"
            @blur="address.handleBlur"
            v-model="address.value"
            class="shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="address.meta.touched && !address.meta.valid ? 'border border-red-500' : ''"
            id="name"
          />
          <span v-if="address.meta.touched && !address.meta.valid" class="text-red-500 text-xs italic">
            {{ address.errorMessage || "Field is required" }}
          </span>
        </div>

        <!-- House Name -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            House Name
          </label>

          <input
            type="text"
            placeholder="House Name"
            @input="house_name.handleChange"
            @blur="house_name.handleBlur"
            v-model="house_name.value"
            class="shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="house_name.meta.touched && !house_name.meta.valid ? 'border border-red-500' : ''"
          />
          <span v-if="house_name.meta.touched && !house_name.meta.valid" class=" text-red-500 text-xs italic">
            {{ house_name.errorMessage || "Field is required" }}
          </span>
        </div>

        <!-- Land mark -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">
            Landmark
          </label>

          <input
            type="text"
            placeholder="Landmark"
            @input="landmark.handleChange"
            @blur="landmark.handleBlur"
            v-model="landmark.value"
            class="shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="landmark.meta.touched && !landmark.meta.valid ? 'border border-red-500' : ''"
          />
          <span v-if="landmark.meta.touched && !landmark.meta.valid" class=" text-red-500 text-xs italic">
            {{ landmark.errorMessage || "Field is required" }}
          </span>
        </div>

        <!-- Add Address -->
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
            {{ addressId ? "Update" : "ADD" }}
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
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useForm, useField } from "vee-validate";

export default {
  name: "Add Category",
  components: { HeaderComponent, RightHandSide },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isSubmitting = ref(false);
    const { meta: formMeta, handleSubmit } = useForm();
    const address = reactive(useField("address", "required"));
    const house_name = reactive(useField("house_name", "required"));
    const landmark = reactive(useField("landmark", "required"));

    const addressId = computed(() => route.query.addressId);

    const submitForm = handleSubmit((formValues) => {
      isSubmitting.value = true;
      if (addressId.value) {
        formValues.address_id = addressId.value;
        store.dispatch("address/updateAddress", formValues).then((res) => {
          isSubmitting.value = false;
          if (res.data.status) {
            useToast(res.data.message, "success");
            router.push({ name: "Manage Address" });
          } else {
            useToast(res.data.message, "danger");
          }
        });
      } else {
        store.dispatch("address/addAddress", formValues).then((res) => {
          isSubmitting.value = false;
          if (res.data.status) {
            useToast(res.data.message, "success");
            router.push({ name: "Manage Address" });
          } else {
            useToast(res.data.message, "danger");
          }
        });
      }
    });

    onMounted(() => {
      if (addressId.value) {
        store.dispatch("address/getAddressById", addressId.value).then((res) => {
          if (res.data.status) {
            address.value = res.data.data.address;
            house_name.value = res.data.data.house_name;
            landmark.value = res.data.data.landmark;
          } else {
            address.value = "";
            house_name.value = "";
            landmark.value = "";
          }
        });
      }
    });

    return {
      router,
      formMeta,
      isSubmitting,
      submitForm,
      address,
      house_name,
      landmark,
      addressId,
    };
  },
};
</script>

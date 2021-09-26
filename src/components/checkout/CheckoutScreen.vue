<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start mb-10">
    <div class="p-1 sm:p-3 w-full">
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
        <div class="flex items-center justify-center w-4/6 ">Checkout</div>
        <div class="w-1/6"></div>
      </section>

      <form @submit="submitForm" class="shadow rounded px-5 p-3">
        <!-- Personal Information -->
        <section class="mb-7">
          <div class="md:text-lg font-medium mb-3">
            Personal Information
          </div>
          <div class="flex flex-col md:flex-row items-center justify-between md:mb-1 md:space-x-2">
            <!-- Name -->
            <div class="w-full md:w-1/2 mb-1 md:mb-0">
              <input
                type="text"
                placeholder="Name"
                @input="user_name.handleChange"
                @blur="user_name.handleBlur"
                v-model="user_name.value"
                class="shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                :class="user_name.meta.touched && !user_name.meta.valid ? 'border border-red-500' : ''"
                id="user_name"
              />
              <span
                class="text-red-500 text-xs italic"
                :class="user_name.meta.touched && !user_name.meta.valid ? 'opacity-1' : 'opacity-0'"
              >
                {{ user_name.errorMessage || "Field is required" }}
              </span>
            </div>
            <!-- Phone-->
            <div class="w-full md:w-1/2 mb-1 md:mb-0">
              <div class="flex items-center relative">
                <div class="absolute left-2 border-r border-gray-500 pr-2">+91</div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  @input="phone.handleChange"
                  @blur="phone.handleBlur"
                  v-model="phone.value"
                  class="pl-14 shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  :class="phone.meta.touched && !phone.meta.valid ? 'border border-red-500' : ''"
                  id="name"
                />
              </div>
              <span
                class="text-red-500 text-xs italic"
                :class="phone.meta.touched && !phone.meta.valid ? 'opacity-1' : 'opacity-0'"
              >
                {{ phone.errorMessage || "Field is required" }}
              </span>
            </div>
          </div>

          <div class="flex flex-col md:flex-row items-center justify-between md:mb-1 md:space-x-2">
            <!-- Email -->
            <div class="w-full md:w-1/2 mb-0 md:mb-0">
              <input
                type="email"
                placeholder="Email"
                @input="email.handleChange"
                @blur="email.handleBlur"
                v-model="email.value"
                class="shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                :class="email.meta.touched && !email.meta.valid ? 'border border-red-500' : ''"
              />
              <span v-if="email.meta.touched && !email.meta.valid" class=" text-red-500 text-xs italic">
                {{ email.errorMessage || "Field is required" }}
              </span>
            </div>
            <!-- Empty -->
            <div class="w-full md:w-1/2 mb-0 md:mb-0"></div>
          </div>
        </section>

        <!-- Address Information -->
        <section class="mb-7">
          <div class="md:text-lg font-medium mb-3">
            Address Information
          </div>
          <!--For Guest User -->
          <section v-if="!isUserLoggedIn">
            <!-- Address -->
            <div class="mb-4">
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

            <!-- House Name & Landmark -->
            <div class="flex flex-col md:flex-row items-center justify-between md:mb-4 md:space-x-2">
              <div class="w-full md:w-1/2 mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="House Name"
                  @input="house_name.handleChange"
                  @blur="house_name.handleBlur"
                  v-model="house_name.value"
                  class="shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  :class="house_name.meta.touched && !house_name.meta.valid ? 'border border-red-500' : ''"
                />
                <span
                  class=" text-red-500 text-xs italic"
                  :class="house_name.meta.touched && !house_name.meta.valid ? 'opacity-1' : 'opacity-0'"
                >
                  {{ house_name.errorMessage || "Field is required" }}
                </span>
              </div>

              <div class="w-full md:w-1/2 mb-0 md:mb-0">
                <input
                  type="text"
                  placeholder="Landmark"
                  @input="landmark.handleChange"
                  @blur="landmark.handleBlur"
                  v-model="landmark.value"
                  class="shadow appearance-none border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  :class="landmark.meta.touched && !landmark.meta.valid ? 'border border-red-500' : ''"
                />
                <span
                  class=" text-red-500 text-xs italic"
                  :class="landmark.meta.touched && !landmark.meta.valid ? 'opacity-1' : 'opacity-0'"
                >
                  {{ landmark.errorMessage || "Field is required" }}
                </span>
              </div>
            </div>
          </section>
          <!-- For Registered User -->
          <section v-if="isUserLoggedIn">
            <!-- Select Address -->
            <div class="mb-3">
              <label class="block text-base font-medium mb-2">
                Select Address
              </label>
              <select
                v-model="user_address_id.value"
                @change="addressChangeEvent($event)"
                class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                :class="user_address_id.meta.touched && !user_address_id.meta.valid ? 'border border-red-500' : ''"
              >
                <option class="py-1" value="">Select Address</option>
                <option class="py-1" :value="address.id" v-for="address in user_addresses" :key="address.id">
                  {{ address.house_name }}</option
                >
              </select>
              <span v-if="user_address_id.meta.touched && !user_address_id.meta.valid" class=" text-red-500 text-xs italic">
                {{ user_address_id.errorMessage || "Field is required" }}
              </span>
            </div>
            <!-- Show Selected Address -->
            <div class="w-full rounded shadow" v-if="user_address_id.value">
              <div class="flex flex-col px-3 py-2 border-b">
                <div class="text-base md:text-lg font-medium">{{ selected_address.house_name }}</div>
                <div class="text-sm md:text-base">{{ selected_address.address }}</div>
                <div class="text-sm md:text-base">
                  <span class="font-medium"> Landmark:</span> {{ selected_address.landmark }}
                </div>
              </div>
              <div class="flex items-center justify-end cursor-pointer text-sm px-3 py-2">
                <router-link :to="{ name: 'Add Address', query: { addressId: selected_address.id } }">
                  <fa :icon="['fa', 'edit']" class="text-gray-900 mr-1"></fa> EDIT
                </router-link>
              </div>
            </div>
          </section>
        </section>

        <!-- Payment Method -->
        <section>
          <div class="md:text-lg font-medium mb-3">
            Payment Method
          </div>

          <div class="mb-4">
            <div class="mt-2">
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio" v-model="payment_method.value" name="paymentType" value="1" />
                <span class="ml-2">Cash</span>
              </label>
              <!-- <label class="inline-flex items-center ml-6">
                <input type="radio" class="form-radio" name="accountType" value="busines" />
                <span class="ml-2">Business</span>
              </label> -->
            </div>
          </div>
        </section>
      </form>
    </div>
  </section>
  <!-- Floating Button -->
  <floating-button :floatingButtonText="'Proceed'" :isLink="false" :link="'Checkout'" :clickMethod="submitForm"></floating-button>
  <!-- RHS -->
  <section>
    <right-hand-side></right-hand-side>
  </section>
</template>

<script>
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import RightHandSide from "@/components/common/RightHandSide";
import FloatingButton from "@/components/common/FloatingButton";
import useToast from "@/hooks/useToast";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";

export default {
  name: "Checkout",
  components: { HeaderComponent, RightHandSide, FloatingButton },

  setup() {
    const router = useRouter();
    const store = useStore();
    const checkout_detail = ref([]);
    const user_addresses = ref([]);
    const selected_address = ref([]);
    const isSubmitting = ref(false);
    const { meta: formMeta, handleSubmit } = useForm();
    const user_address_id = reactive(useField("user_address_id", requiredFieldsForRegistered, { initialValue: "" }));
    const user_name = reactive(useField("user_name", "required"));
    const email = reactive(useField("email", "email"));
    const phone = reactive(useField("phone", "phone"));
    const address = reactive(useField("address", requiredForGuest, { initialValue: "" }));
    const house_name = reactive(useField("house_name", requiredForGuest, { initialValue: "" }));
    const landmark = reactive(useField("landmark", requiredForGuest, { initialValue: "" }));
    const payment_method = reactive(useField("payment_method", "required", { initialValue: "1" }));
    function requiredFieldsForRegistered() {
      if (!isUserLoggedIn.value || user_address_id.value != "") {
        return true;
      }
      return "Field is required";
    }
    function requiredForGuest(address, house_name, landmark) {
      if (
        isUserLoggedIn.value ||
        (!isUserLoggedIn.value &&
          address != "" &&
          !isUserLoggedIn.value &&
          house_name != "" &&
          !isUserLoggedIn.value &&
          landmark != "")
      ) {
        return true;
      }
      return "Field is required";
    }

    const submitForm = handleSubmit((formValues) => {
      isSubmitting.value = true;
      store.dispatch("checkout/createOrder", formValues).then((res) => {
        isSubmitting.value = false;
        if (res.data.status) {
          useToast(res.data.message, "success");
          store.commit("cart/setCartDetails", "");
          router.push({ name: "Confirmation", query: { orderId: res.data.data.id } });
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    const addressChangeEvent = (event) => {
      if (event.target.value) {
        let addressId = event.target.value;
        for (let address of Object.values(user_addresses.value)) {
          if (address.id == addressId) {
            selected_address.value = address;
          }
        }
      }
    };

    const isUserLoggedIn = computed(() => store.getters["auth/isUserLoggedIn"]);

    onMounted(() => {
      store.dispatch("checkout/getCheckoutDetail").then((res) => {
        if (res.data.status) {
          checkout_detail.value = res.data.data;
          let cart = res.data.data && res.data.data.cart ? res.data.data.cart : [];
          user_name.value = cart && cart.user_name ? cart.user_name : "";
          email.value = cart && cart.user_email ? cart.user_email : "";
          user_addresses.value = res.data.data && res.data.data.user_addresses ? res.data.data.user_addresses : [];
        } else {
          useToast(res.data.message, "danger");
        }
      });
    });

    return {
      router,
      isSubmitting,
      checkout_detail,
      user_addresses,
      selected_address,
      user_address_id,
      user_name,
      email,
      phone,
      address,
      house_name,
      landmark,
      payment_method,
      formMeta,
      submitForm,
      addressChangeEvent,
      isUserLoggedIn,
    };
  },
};
</script>

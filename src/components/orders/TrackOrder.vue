<template>
  <header-component></header-component>
  <!-- LHS -->
  <section class="top min-h-no-header w-full sm:w-1/2 flex flex-col items-center justify-start">
    <section class="flex flex-col items-center justify-center p-2 sm:p-3 w-full">
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
        <div class="flex items-center justify-center w-4/6 ">Track Order</div>
        <div class="w-1/6"></div>
      </section>
    </section>
    <!-- Form -->
    <div class="h-full p-3 w-full sm:max-w-lg flex flex-col justify-center">
      <form @submit="submitForm" class="flex items-start justify-between w-full shadow rounded-top p-3">
        <!-- OrderId -->
        <div class="flex flex-col items-start mr-1 w-2/3">
          <input
            type="text"
            placeholder="Enter Order ID"
            @input="orderIdField.handleChange"
            @blur="orderIdField.handleBlur"
            v-model="orderIdField.value"
            class="shadow appearance-none text-sm sm:text-base border rounded w-full h-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="orderIdField.meta.touched && !orderIdField.meta.valid ? 'border border-red-500' : ''"
          />
          <span v-if="orderIdField.meta.touched && !orderIdField.meta.valid" class="text-red-500 text-xs italic mt-1">
            {{ orderIdField.errorMessage || "Field is required" }}
          </span>
        </div>

        <!-- Track Btn -->
        <div class="flex items-center ml-1 w-1/3">
          <button
            :disabled="isSubmitting ? true : false"
            type="submit"
            class="w-full text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline text-sm sm:text-base"
            :class="[formMeta.valid ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-500 hover:bg-gray-500']"
          >
            Track
          </button>
        </div>
      </form>
      <!-- Order Statuses Detail IF -->
      <div v-if="myOrderDetail && myOrderDetail.transaction_id">
        <section class="flex items-center justify-center rounded text-white bg-gray-900 p-3 mt-5">
          Order #{{ myOrderDetail.transaction_id }}
        </section>
        <section
          class="w-full h-50 flex flex-col items-center justify-center border-r border-l"
          v-for="status in myOrderStatuses"
          :key="status.status_id"
        >
          <div class="border border-gray-200 bg-gray-200 h-10 sm:h-16 w-1"></div>
          <div class="w-full flex items-center justify-center">
            <div class="w-2/5 flex items-center justify-end text-sm sm:text-base">
              <div class="mr-2">{{ status.date }}</div>
              <small>{{ status.time }}</small>
            </div>
            <div
              class="h-7 w-7 rounded-full border-2 mx-3"
              :class="status.status == 'Order Rejected' ? 'border-red-500' : 'border-green-300'"
            ></div>
            <div class="w-2/5 flex items-center justify-start text-sm sm:text-base">{{ status.status }}</div>
          </div>
        </section>
      </div>
      <div v-else>
        <!-- <section class="flex items-center justify-center rounded text-white bg-gray-900 p-5 mt-5"></section> -->
        <section
          class="w-full h-50 flex flex-col items-center justify-center border-r border-l"
          v-for="status in 4"
          :key="status.status_id"
        >
          <div class="border border-gray-200 bg-gray-200 h-10 sm:h-16 w-1"></div>
          <div class="w-full flex items-center justify-center">
            <div class="w-2/5 flex items-center justify-end text-sm sm:text-base"></div>
            <div
              class="h-7 w-7 rounded-full border-2 mx-3"
              :class="status.status == 'Order Rejected' ? 'border-red-500' : 'border-green-300'"
            ></div>
            <div class="w-2/5 flex items-center justify-start text-sm sm:text-base"></div>
          </div>
        </section>
      </div>
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
// import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";

export default {
  name: "Track Order",
  components: { HeaderComponent, RightHandSide },

  setup() {
    const store = useStore();
    const router = useRouter();
    const isSubmitting = ref(false);
    const { meta: formMeta, handleSubmit } = useForm();
    const orderIdField = reactive(useField("orderId", "requiredMinMax"));
    const myOrderDetail = ref([]);
    const myOrderStatuses = ref([]);

    const submitForm = handleSubmit((formValues) => {
      isSubmitting.value = true;
      store.dispatch("orders/getOrderStatuses", formValues.orderId).then((res) => {
        isSubmitting.value = false;
        if (res.data.status) {
          useToast(res.data.message, "success");
          myOrderDetail.value = res.data.data;
          myOrderStatuses.value = res.data.data.order_status;
        } else {
          myOrderDetail.value = [];
          myOrderStatuses.value = [];
          useToast(res.data.message, "danger");
        }
      });
    });

    onMounted(() => {
      store.dispatch("orders/getOrderStatuses", "FAT0000003").then((res) => {
        if (res.data.status) {
          myOrderDetail.value = res.data.data;
          myOrderStatuses.value = res.data.data.order_status;
        } else {
          myOrderDetail.value = [];
          myOrderStatuses.value = [];
          useToast(res.data.message, "danger");
        }
      });
    });

    return {
      router,
      isSubmitting,
      orderIdField,
      formMeta,
      submitForm,
      myOrderDetail,
      myOrderStatuses,
    };
  },
};
</script>

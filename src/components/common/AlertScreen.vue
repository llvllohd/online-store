<template>
  <!-- Modal -->
  <div
    class="flex justify-center items-center p-3 overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    v-if="is_show"
    id="modal-example-small"
  >
    <div class="relative w-auto mx-auto max-w-sm">
      <!--content-->
      <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <!--header-->
        <div class="flex items-center justify-between p-2 border-b border-solid border-gray-200 rounded-t">
          <div class="flex items-center justify-between text-lg font-medium ml-2">
            <svg class="w-6 h-6 text-red-500 fill-current mr-2" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"
              />
            </svg>
            Delete Alert
          </div>
          <fa :icon="['fa', 'times']" class="text-gray-900 text-sm mr-2 cursor-pointer" @click.prevent="confirmAlert(false)">
          </fa>
        </div>
        <!--body-->
        <div class="relative p-2 flex-auto">
          <div class="my-2 ml-2 text-lg leading-relaxed">
            Do you want to delete this ?
          </div>
        </div>
        <!--footer-->
        <div class="flex items-center justify-between p-2 border-t border-solid border-gray-200 rounded-b">
          <button
            class="w-20 text-white bg-gray-900 hover:bg-gray-800 font-medium py-1 rounded focus:outline-none focus:shadow-outline"
            @click.prevent="confirmAlert(false)"
          >
            Cancel
          </button>
          <button
            class="w-20 text-white bg-gray-900 hover:bg-gray-800 font-medium py-1 rounded focus:outline-none focus:shadow-outline"
            @click.prevent="confirmAlert(true)"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="hidden opacity-25 fixed inset-0 z-40 bg-black" id="modal-example-small-backdrop"></div>
</template>

<script>
import { onMounted, ref, watch } from "vue";

export default {
  name: "Categories",
  components: {},
  emits: ["confirmAlert"],
  props: {
    isAlert: {
      type: Boolean,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    deleteAction: {
      type: Function,
    },
  },
  setup(props, context) {
    const is_show = ref(false);

    const confirmAlert = (value) => {
      if (value == true) {
        props.deleteAction(props.itemId);
      }
      is_show.value = value;
      context.emit("confirmAlert", value);
    };

    watch(
      () => props.isAlert,
      (newValue) => {
        is_show.value = newValue;
      }
    );

    onMounted(() => {});

    return {
      is_show,
      confirmAlert,
    };
  },
};
</script>

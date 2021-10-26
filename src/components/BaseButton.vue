<template>
  <div
    @click="triggerClickEvent"
    class="flex items-center justify-center w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    :class="[
      formMeta.touched && !formMeta.valid ? 'bg-gray-500 hover:bg-gray-500' : 'bg-gray-900 hover:bg-gray-800',
      isSubmitting ? 'cursor-not-allowed' : 'sm:cursor-pointer',
    ]"
  >
    {{ label }}
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    clickMethod: {
      type: Function,
      required: true,
    },
    formMeta: {
      type: Object,
    },
    isSubmitting: {
      type: Boolean,
    },
  },
  setup(props) {
    const triggerClickEvent = () => {
      props.clickMethod();
    };

    return {
      triggerClickEvent,
    };
  },
};
</script>

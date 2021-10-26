<template>
  <input class="rounded" type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
  <label class="text-sm font-bold ml-2" v-if="label"> {{ label }}</label>
  <span class="text-red-500 text-xs italic" v-if="error"> {{ error }}</span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>

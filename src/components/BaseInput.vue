<template>
  <label class="block text-sm font-bold mb-2" v-if="isLabel && label"> {{ label }}</label>
  <input
    :class="[error ? 'border-red-500' : '', 'w-full rounded']"
    :placeholder="label"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onInput: ($event) => {
        $emit('update:modelValue', $event.target.value);
      },
    }"
  />
  <span class="text-red-500 text-xs italic" v-if="error">
    {{ error }}
  </span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    isLabel: {
      type: Boolean,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>

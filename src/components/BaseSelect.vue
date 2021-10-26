<template>
  <label class="block text-sm font-bold mb-2" v-if="label"> {{ label }}</label>
  <select
    :class="[error ? 'border-red-500' : '', 'w-full rounded']"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onChange: ($event) => {
        $emit('update:modelValue', $event.target.value);
      },
    }"
  >
    <option v-for="option in options" :value="option.value" :key="option" :selected="option.value === modelValue">
      {{ option.text }}
    </option>
  </select>
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
      type: [String, Number],
      default: "",
    },
    options: {
      required: true,
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>

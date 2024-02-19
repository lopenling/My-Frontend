<template>
  <label v-if="label" :for="`input-${id}`" class="mb-2 block text-sm font-medium leading-6 text-stone-900">{{ label
  }}</label>
  <div class="mt-2">
    <input :id="`input-${id}`" :type="type" :name="`input-${id}`"
      class="block w-full rounded-md border-0 bg-white py-1.5 text-stone-800 ring-1 ring-inset ring-stone-300 transition placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
      v-bind="$attrs" model-value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  id: String;
  label?: String;
  type:
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";
  modelValue: String;
};

defineProps<Props>();

defineEmits(["update:modelValue"]);
</script>

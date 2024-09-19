<template>
  <input
    type="text"
    :value="modelValue"
    class="w-full rounded-md border-0 px-3 py-1.5 text-stone-800 ring-1 ring-inset placeholder:text-stone-400 autofill:shadow-[inset_0_0_0px_999px_hsl(47deg_100%_96%)] focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
    :class="[
      appearance == 'white'
        ? 'bg-white ring-stone-300'
        : appearance == 'transparent'
          ? 'bg-transparent ring-black/[15%]'
          : appearance == 'gray'
            ? 'bg-stone-50 ring-stone-300 focus:bg-primary-50 focus:text-primary-800'
            : 'bg-stone-50 ring-stone-300 focus:bg-primary-50 focus:text-primary-800',
      shadow && 'shadow-sm',
    ]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: String
  appearance?: 'gray' | 'white' | 'transparent'
  shadow?: boolean
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <MenuItem v-slot="{ active }">
    <component
      :is="href ? 'a' : 'button'"
      :href="href"
      class="block w-full px-4 py-2 text-left text-sm"
      :class="active ? 'bg-stone-100 text-stone-900' : 'text-stone-700'"
    >
      <slot name="default" />
    </component>
  </MenuItem>
</template>

<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'

defineProps<{
  href?: string
}>()
</script>

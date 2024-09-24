<template>
  <button
    type="button"
    :class="[
      'inline-flex w-full justify-center rounded-md px-3.5 py-2 text-sm font-semibold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto',
      appearance == 'primary' &&
        'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600',
      appearance == 'danger' &&
        'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600',
      appearance == 'default' || !appearance
        ? 'bg-white text-stone-900 ring-1 ring-inset ring-stone-300 hover:bg-stone-100 focus-visible:outline-primary-600'
        : '',
      wideButtons && 'sm:shirnk sm:min-w-max sm:grow sm:basis-0',
    ]"
    @click="handleClick"
  >
    <slot name="default" />
  </button>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import eventBus from '@/lib/eventBus'

const props = defineProps<{
  closeModal?: boolean
  appearance?: 'primary' | 'danger' | 'default'
}>()

const wideButtons = inject<boolean>('wideButtons')

const handleClick = () => {
  if (props.closeModal) {
    eventBus.emit('close::modal')
  }
}
</script>

<template>
  <div :class="['flex shrink-0', sizeClass ? sizeClass : 'size-8']">
    <img
      v-if="user.avatar && !hideImage"
      v-bind="$attrs"
      :src="user.avatar"
      :alt="user.full_name"
      :class="[
        'rounded-md transition',
        sizeClass ? sizeClass : 'size-8',
        groupHover && 'group-hover:opacity-85 ',
        subdueImage && 'opacity-60 grayscale',
      ]"
    />
    <span
      v-else
      v-bind="$attrs"
      :class="[
        'flex items-center justify-center rounded-md bg-primary-400/25 text-center text-sm font-bold text-primary-600/75 transition',
        sizeClass ? sizeClass : 'size-8',
        groupHover && 'group-hover:bg-primary-400/40 group-hover:text-primary-600/90',
        subdueImage && 'opacity-60 grayscale',
      ]"
    >
      <span v-if="hideImage">{{ mailFirstLetter }}</span>
      <span v-else>{{ userInitials }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/stores/user'

const props = defineProps<{
  user: Pick<User, 'avatar' | 'full_name' | 'first_name' | 'last_name' | 'email'>
  sizeClass?: string
  groupHover?: boolean
  hideImage?: boolean
  subdueImage?: boolean
}>()

const mailFirstLetter = computed(() => {
  return props.user.email.charAt(0).toUpperCase()
})
const userInitials = computed(() => {
  return (
    props.user.first_name.charAt(0).toUpperCase() + props.user.last_name.charAt(0).toUpperCase()
  )
})

defineOptions({
  inheritAttrs: false,
})
</script>

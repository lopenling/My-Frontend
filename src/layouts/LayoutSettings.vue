<template>
  <TheHeader />
  <div class="px-4 pb-20 pt-4 sm:px-6">
    <div class="mx-auto max-w-3xl">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/header/TheHeader.vue'
</script>

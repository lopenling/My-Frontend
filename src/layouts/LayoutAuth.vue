<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo width="40" height="40" class="mx-auto" />
      <h2 class="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-stone-900">
        <slot name="header"></slot>
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[426px]">
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/components/icons/LopenlingLogo.vue'
</script>

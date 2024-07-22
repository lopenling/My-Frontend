<template>
  <div
    class="flex flex-col gap-y-10 py-10 2xs:gap-y-12 2xs:py-12 sm:gap-y-12 sm:px-4 sm:py-12 md:gap-y-14 md:py-14"
  >
    <div class="flex justify-center">
      <router-link
        to="/"
        class="focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-primary-600"
      >
        <LopenlingLogo size="40" />
      </router-link>
    </div>
    <div class="flex justify-center">
      <div
        class="w-full bg-white px-4 pb-14 pt-14 shadow 2xs:px-6 2xs:pb-16 2xs:pt-16 sm:w-auto sm:rounded-lg sm:px-16 sm:py-20 md:px-24 md:py-28"
      >
        <div class="prose prose-sm prose-stone font-serif md:prose-base prose-p:text-pretty">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LopenlingLogo from '@/components/icons/LopenlingLogo.vue';
</script>

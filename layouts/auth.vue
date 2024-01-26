<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <slot />
  </div>
</template>

<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class:
      "h-full bg-stone-100 text-stone-700 selection:bg-primary-400/40 selection:text-primary-950",
  },
  bodyAttrs: {
    class: "h-full",
  },
});
</script>

<style>
#__nuxt {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

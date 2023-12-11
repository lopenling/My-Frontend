<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <IconsLogo width="40" height="40" class="mx-auto" />
      <h2
        class="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-stone-900"
      >
        <span>Sign in to Lopenling</span>
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[426px]">
      <slot />

      <div class="mt-10 text-center text-sm">
        <span class="text-stone-500">New here? &#32;</span>
        <BasicPopover position="top">
          <template #button>
            <span
              class="text-sm font-medium leading-snug text-primary-600 underline decoration-transparent underline-offset-2 transition hover:text-primary-500 hover:decoration-primary-500/25 group-focus-visible:rounded-sm group-focus-visible:outline group-focus-visible:outline-offset-2"
            >
              Account registration
            </span>
          </template>

          <template #panel>
            <div class="text-left text-sm">
              To get started with Lopenling, enter your email address above and
              click 'Continue'.
            </div>
          </template>
        </BasicPopover>
      </div>
    </div>
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

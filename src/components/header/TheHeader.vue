<template>
  <nav class="bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <LopenlingLogo size="30" />
          </div>
          <div class="hidden sm:ml-8 sm:flex">
            <nav class="-my-px flex gap-x-8">
              <router-link
                to="/dashboard"
                exact-active-class="border-primary-500 text-stone-900"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition"
                :aria-current="route.path === '/dashboard' ? 'page' : undefined"
              >
                Dashboard
              </router-link>
              <router-link
                to="/glossary"
                exact-active-class="border-primary-500 text-stone-900"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition"
                :aria-current="route.path === '/glossary' ? 'page' : undefined"
              >
                Glossary
              </router-link>
              <router-link
                to="/projects"
                exact-active-class="border-primary-500 text-stone-900"
                class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition"
                :aria-current="route.path === '/projects' ? 'page' : undefined"
              >
                Projects
              </router-link>
            </nav>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div class="ml-3">
            <HeaderProfile />
          </div>
        </div>

        <div class="-mr-2 flex items-center sm:hidden">
          <!--      <VueHeaderMobileMenuButton astro={Astro} client:load />-->
        </div>
      </div>
    </div>

    <div class="relative">
      <div class="absolute -top-px left-0 right-0 z-20 bg-white shadow-xl">
        <!--    <VueHeaderMobileMenu astro={Astro} client:load />-->
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import LopenlingLogo from '@/components/icons/LopenlingLogo.vue'
import { useRoute } from 'vue-router'
import HeaderProfile from '@/components/header/HeaderProfile.vue'

const route = useRoute()
</script>

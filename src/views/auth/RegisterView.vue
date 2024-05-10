<template>
  <LayoutAuth>
    <template #header>
      <span>New account</span>
    </template>

    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <div class="text-md mb-12">
        <h3 class="mb-6 font-semibold text-primary-800">Account preferences</h3>

        <p class="mb-4">
          Only your email address is needed to sign in, because we will send you a magic link.
          However, you can also use a password.
        </p>
        <p>Would you like to add a password to your account?</p>
      </div>

      <router-link :to="addMailToLink('/login/link')">
        <button
          type="button"
          class="mb-4 flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Use magic link only
        </button>
      </router-link>
      <router-link :to="addMailToLink('/register/password')">
        <button
          type="button"
          class="hover:text-seconday-900 flex w-full justify-center rounded-md bg-primary-300 px-3 py-1.5 text-sm font-semibold leading-6 text-primary-800 shadow-sm transition hover:bg-primary-400/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        >
          Add password
        </button>
      </router-link>
    </div>

    <template #footer>
      <div class="mt-10 text-center text-sm">
        <router-link
          to="/login"
          class="font-normal leading-6 text-stone-500 underline decoration-transparent underline-offset-2 transition hover:text-stone-700 hover:decoration-stone-700/25 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-offset-2"
        >
          Go back a step
        </router-link>
      </div>
    </template>
  </LayoutAuth>
</template>

<script setup lang="ts">
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import { useRoute } from 'vue-router'

const email = useRoute().query.email

function addMailToLink(link: string) {
  return `${link}?email=${email}`
}
</script>

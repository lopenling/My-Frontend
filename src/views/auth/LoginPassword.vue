<template>
  <LayoutAuth>
    <template #header>
      <span>Sign in to Lopenling</span>
    </template>

    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <!-- Form -->
      <div class="flex flex-col">
        <form id="passwordForm" @submit.prevent="login">
          <!-- Hidden email field, for password managers and accessibility -->
          <!-- https://www.chromium.org/developers/design-documents/create-amazing-password-forms/ -->
          <input
            id="email"
            v-model="email"
            class="hidden"
            type="email"
            name="email"
            required
            autocomplete="email"
          />
          <FormInput
            id="password"
            v-model="password"
            label="Enter password"
            class="mb-4"
            type="password"
            autocomplete="current-password"
            :required="true"
            :autofocus="true"
          />

          <div class="mb-8 flex items-center">
            <input
              id="use-password-sign-in"
              v-model="defaultToPassword"
              name="use-password-sign-in"
              type="checkbox"
              checked
              class="h-4 w-4 rounded border-stone-300 text-primary-600 focus:ring-primary-600"
            />
            <label for="use-password-sign-in" class="ml-3 block text-sm leading-6 text-stone-900">
              Use password sign-in by default
            </label>
          </div>

          <div class="mb-8">
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <div class="text-left text-sm">
          <a
            href="/forgot-password"
            class="font-normal text-primary-600 underline decoration-transparent underline-offset-2 outline-none transition hover:text-primary-500 hover:decoration-primary-500/25 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-offset-2"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="relative mt-6">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-stone-200"></div>
        </div>
        <div class="font-regular relative flex justify-center text-sm leading-6">
          <span class="bg-white px-6 text-stone-500">Or</span>
        </div>
      </div>

      <!-- Social buttons -->
      <div class="mt-6">
        <!-- onclick="window.location.href='/sign-in/check-inbox-sign-in';" -->
        <button
          type="button"
          class="flex w-full items-center justify-center gap-3 rounded bg-white px-2 py-1 text-sm font-semibold text-stone-500 shadow-sm ring-1 ring-inset ring-stone-300 transition hover:bg-stone-50 hover:text-stone-700 focus-visible:outline focus-visible:-outline-offset-1"
        >
          <IconDataWandMagicSparkles />
          <span class="text-sm font-semibold leading-6"> Sign in with magic link </span>
        </button>
      </div>
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
import FormInput from '@/components/form/FormInput.vue'
import IconDataWandMagicSparkles from '@/components/icons/fontawesome/solid/IconWandMagicSparkles.vue'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const email = useRoute().query.email as string
const password = ref('')
const defaultToPassword = ref(true)

const router = useRouter()

async function login() {
  await userStore.loginPassword(email, password.value, defaultToPassword.value)
  router.push('/dashboard')
}
</script>

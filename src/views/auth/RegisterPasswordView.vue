<template>
  <LayoutAuth>
    <template #header>
      <span>New account</span>
    </template>

    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <div class="text-md mb-8">
        <h3 class="mb-6 font-semibold text-primary-800">Choosing a password</h3>
        <p class="mb-4">
          Don't worry, it does not have to follow any complicated rules. Just make it as long as
          possible.
        </p>
      </div>
      <form id="passwordForm" @submit.prevent="register">
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
          autocomplete="new-password"
          label="Password"
          class="mb-4"
          type="password"
          :required="true"
          :autofocus="true"
        />
        <FormInput
          id="password_repeat"
          v-model="password_repeat"
          autocomplete="new-password"
          label="Password again"
          class="mb-8"
          type="password"
          :required="true"
          :autofocus="true"
        />

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Set password
          </button>
        </div>
      </form>
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
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import FormInput from '@/components/form/FormInput.vue'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const email = route.query.email as string

let password = ref('')
let password_repeat = ref('')

async function register() {
  userStore.setInitialPassword(email, password.value, password_repeat.value).then(() => {
    router.push('/dashboard')
  })
}
</script>

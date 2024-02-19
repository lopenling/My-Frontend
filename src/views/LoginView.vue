<template>
  <LayoutAuth>
    <template #header>
      <span>Sign in to Lopenling</span>
    </template>

    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <!-- Form -->
      <form id="emailForm" @submit.prevent="login">
        <FormInput
          id="email"
          v-model="email"
          label="Email address"
          class="mb-8"
          type="email"
          :required="true"
          :autofocus="true"
        />

        <div class="">
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Continue
          </button>
        </div>
      </form>

      <!-- Divider -->
      <div class="relative mt-6">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-stone-200"></div>
        </div>
        <div class="font-regular relative flex justify-center text-sm leading-6">
          <span class="bg-white px-6 text-stone-500">Or sign in with</span>
        </div>
      </div>

      <!-- Social buttons -->
      <div class="mt-6 grid grid-cols-2 gap-4">
        <a
          href="#google"
          class="flex w-full items-center justify-center gap-3 rounded bg-white px-2 py-1 text-sm font-semibold text-stone-500 shadow-sm ring-1 ring-inset ring-stone-300 transition hover:bg-stone-50 hover:text-stone-700 focus-visible:outline focus-visible:-outline-offset-1"
          @click="handleGoogleLogin"
        >
          <IconsGoogle />
          <span class="text-sm font-semibold leading-6">Google</span>
        </a>
        <a
          href="#meta"
          class="flex w-full items-center justify-center gap-3 rounded bg-white px-2 py-1 text-sm font-semibold text-stone-500 shadow-sm ring-1 ring-inset ring-stone-300 transition hover:bg-stone-50 hover:text-stone-700 focus-visible:outline focus-visible:-outline-offset-1"
          @click="handleMetaLogin"
        >
          <IconsMeta />
          <span class="text-sm font-semibold leading-6">Meta</span>
        </a>
      </div>
    </div>

    <template #footer>
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
              To get started with Lopenling, enter your email address above and click 'Continue'.
            </div>
          </template>
        </BasicPopover>
      </div>
    </template>
  </LayoutAuth>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import FormInput from '@/components/form/FormInput.vue'
import IconsMeta from '@/components/icons/IconsMeta.vue'
import IconsGoogle from '@/components/icons/IconsGoogle.vue'
import BasicPopover from '@/components/BasicPopover.vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const email = ref('')

async function login() {
  try {
    const res = await useAuthStore().login(email.value)

    // Get user from Hasura
    const user = await useUserStore().getByEmail(email.value)

    // If user doesn't exist. Make new one
    if (!user) {
      console.log('No user found, creating new one')
      const { mutate } = useUserStore().createUser(email.value)
      await mutate()

      return useRouter().push({
        name: 'sign-in-new-account',
        query: { email: res.email },
      })
    }

    // // Check user default login method
    if (user.default_login_method === 'password') {
      return useRouter().push({
        name: 'login-password',
        query: { email: res.email },
      })
    }

    // Default to login-link
    return useRouter().push({
      name: 'login-link',
      query: { email: res.email },
    })
  } catch (error) {
    console.error(error)
  }
}

//login with google
function handleGoogleLogin() {
  useAuthStore().loginWithGoogle()
}
//login with meta
function handleMetaLogin() {
  useAuthStore().loginWithMeta()
}
</script>

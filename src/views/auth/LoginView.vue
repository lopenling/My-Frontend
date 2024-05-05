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

        <div>
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
          :href="googleUrl"
          class="flex w-full items-center justify-center gap-3 rounded bg-white px-2 py-1 text-sm font-semibold text-stone-500 shadow-sm ring-1 ring-inset ring-stone-300 transition hover:bg-stone-50 hover:text-stone-700 focus-visible:outline focus-visible:-outline-offset-1"
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
        <BasicPopover position="top" main-position="up">
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
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import FormInput from '@/components/form/FormInput.vue'
import IconsMeta from '@/components/icons/fontawesome/brands/IconMeta.vue'
import IconsGoogle from '@/components/icons/fontawesome/brands/IconGoogle.vue'
import BasicPopover from '@/components/BasicPopover.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const email = ref('')

const userStore = useUserStore()
const router = useRouter()
const googleUrl = `${import.meta.env.VITE_API_URL}/v1/auth/google/redirect`

async function login() {
  let user = await userStore.register(email.value)

  // If no default login method then must be new signup and ask for it
  if (!user.defaultLoginMethod) {
    return router.push({
      name: 'Register',
      query: {
        email: email.value,
      },
    })
  }

  if (user.defaultLoginMethod === 'password') {
    return router.push({
      name: 'LoginPassword',
      query: {
        email: email.value,
      },
    })
  }

  if (user.defaultLoginMethod === 'magic_link') {
    return router.push({
      name: 'LoginLink',
      query: {
        email: email.value,
      },
    })
  }
}

// //login with meta
function handleMetaLogin() {
  console.log('Meta app missing')
  // useAuthStore().loginWithMeta()
}
</script>

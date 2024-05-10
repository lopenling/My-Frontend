<template>
  <LayoutAuth>
    <template #header>
      <span>Sign in to Lopenling</span>
    </template>

    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <div class="text-center">
        <div class="flex justify-center pb-6 pt-2 text-primary-400">
          <IconDataEmailActionReadDocument />
        </div>
        <h3 class="mb-2 font-semibold text-primary-800">Check your inbox</h3>
        <p class="text-sm text-stone-700/70">
          We have sent you a magic link. If you did not receive the email,
          <button
            type="button"
            class="font-medium underline decoration-primary-700/25 underline-offset-2 transition hover:text-primary-700 hover:decoration-primary-700/50 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-offset-1"
            @click="sendMagicLink"
          >
            send a new one
          </button>
          .
        </p>
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
import IconDataEmailActionReadDocument from '@/components/icons/streamline/light/IconDataEmailActuinReadDocument.vue'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
let email = useRoute().query.email as string

onMounted(() => {
  sendMagicLink()
})

const sendMagicLink = () => {
  userStore.sendMagicLink(email)
}
</script>

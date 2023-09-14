<template>
  <div v-if="!user.value" class="loader">
    <svg
      width="60"
      height="60"
      class="mx-auto mt-10 animate-bounce w-10 h-10 ..."
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 3.91654e-05L256 0L256 256L204 256L203.999 141L187.999 149L188 193L67.9995 193V115H51.9995L51.9995 217L67.9995 209L188 209V256H3.91654e-05L9.63836e-06 63H120L120 140L136 132L136 47L7.19052e-06 47L0 3.91654e-05ZM188 4.16133e-05L188 106L204 98L204 3.91655e-05L188 4.16133e-05ZM230 128L256 115V141L230 128Z"
        fill="#92B780"></path>
    </svg> 
  </div>
  <Header v-else :user="user.value" />
</template>

<script setup>
import Header from '@/components/headers.vue'
import { useAuth0Store } from '@/stores/auth0';
import { onMounted, reactive, ref } from 'vue';

const user = reactive({})

const auth0Store = useAuth0Store()

onMounted(async() => {
  user.value = await auth0Store.getUserProfile()

})
</script>
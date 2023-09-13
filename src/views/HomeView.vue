<template>
  <div v-if="!user.value" class="loader">
    <svg 
         class="animate-bounce h-10 w-10 mt-10 mx-auto"
        width="60"
        height="60"
        viewBox="0 0 256 256"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 3.91654e-05L256 0L256 256L204 256L203.999 141L187.999 149L188 193L67.9995 193V115H51.9995L51.9995 217L67.9995 209L188 209V256H3.91654e-05L9.63836e-06 63H120L120 140L136 132L136 47L7.19052e-06 47L0 3.91654e-05ZM188 4.16133e-05L188 106L204 98L204 3.91655e-05L188 4.16133e-05ZM230 128L256 115V141L230 128Z"
          fill="#92B780">
        </path>
    </svg> 
  </div>
  <Headers v-else :user="user.value"/>
</template>

<script setup>
import Headers from '@/components/headers.vue'
import { onMounted, reactive, ref } from 'vue';
import { useAuth0Store } from '@/stores/auth0';

const user = reactive({})

const auth0Store = useAuth0Store()

onMounted(async() => {
  user.value = await auth0Store.getUserProfile()
})
</script>
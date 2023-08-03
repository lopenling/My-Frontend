<template>
  <button 
        type="submit" 
        @click="handleLogout"
        class="rounded-sm bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-5 text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        log out
      </button>
      <h3>Logged User Info :  {{ user.value }}</h3>
</template>

<script setup>
import { useAuth0Store } from '@/stores/auth0';
import { onMounted, reactive, ref } from 'vue';

const user = reactive({})

const auth0Store = useAuth0Store()

onMounted(async() => {
  user.value = await auth0Store.getUserProfile()
})

const handleLogout = () => {
  // logout
  auth0Store.logout()
}
  
</script>
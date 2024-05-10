<template>Loading...</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'

let token = useRoute().query.token as string
const router = useRouter()

useUserStore()
  .loginToken(token)
  .then(() => {
    router.push({ name: 'Dashboard' })
  })
  .catch((err) => {
    alert(err.response.data)
    router.push({ name: 'Login' })
  })
</script>

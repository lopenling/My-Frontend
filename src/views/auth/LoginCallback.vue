<template>Loading...</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

useUserStore()
  .me()
  .then(() => {
    router.push('/dashboard')
  })
</script>

<style scoped></style>

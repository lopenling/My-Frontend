<template>
  <LayoutMain v-if="userStore.user && userStore.user.email"> 
    Placeholder Glossary
  </LayoutMain>

  <!-- @TODO Might want to make "Public" layout in future -->
  <div v-else>
    Placeholder Glossary
  </div>
</template>

<script setup lang="ts">
import LayoutMain from '@/layouts/LayoutMain.vue'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()

</script>

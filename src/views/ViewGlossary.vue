<template>
  <LayoutMain v-if="userStore.user && userStore.user.email">
    <MvpGlossary />
  </LayoutMain>

  <!-- @TODO Might want to make "Public" layout in future -->
  <div v-else>
    <MvpGlossary />
  </div>
</template>

<script setup lang="ts">
import LayoutMain from '@/layouts/LayoutMain.vue'
import MvpGlossary from '@/components/Glossary/MvpGlossary.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

</script>

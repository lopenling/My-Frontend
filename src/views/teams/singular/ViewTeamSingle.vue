<template>
  <LayoutSettings>
    <SingularTeamHeader />
    <SingularTeamMembers />
  </LayoutSettings>
</template>

<script lang="ts" setup>
import LayoutSettings from '@/layouts/LayoutSettings.vue'
import SingularTeamHeader from './_partials/SingularTeamHeader.vue'
import SingularTeamMembers from '@/views/teams/singular/_partials/SingularTeamMembers.vue'

console.log('Hello team :)')
</script>

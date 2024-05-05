<template>
  <LayoutSettings>
    <TeamsHeader></TeamsHeader>

    <TeamsAdministratorRole></TeamsAdministratorRole>
  </LayoutSettings>
</template>

<script setup lang="ts">
import LayoutSettings from '@/layouts/LayoutSettings.vue'
import TeamsAdministratorRole from '@/views/teams/TeamsAdministratorRole.vue'
import TeamsHeader from '@/views/teams/TeamsHeader.vue'
import { useTeamsStore } from '@/stores/teams'

const teamsStore = useTeamsStore()
teamsStore.getTeams()
</script>

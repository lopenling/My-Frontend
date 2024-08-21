<template>
  <LayoutSettings>
    <TeamsHeader></TeamsHeader>

    <TeamsAdministratorRole></TeamsAdministratorRole>
    <TeamsNewModal />
  </LayoutSettings>
</template>

<script setup lang="ts">
import LayoutSettings from '@/layouts/LayoutSettings.vue'
import TeamsAdministratorRole from '@/views/teams/TeamsAdministratorRole.vue'
import TeamsHeader from '@/views/teams/TeamsHeader.vue'
import { useTeamsStore } from '@/stores/teams'
import TeamsNewModal from '@/views/teams/TeamsNewModal.vue'

const teamsStore = useTeamsStore()
teamsStore.getTeams()
</script>

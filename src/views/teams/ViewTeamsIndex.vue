<template>
  <LayoutSettings>
    <TeamsHeader></TeamsHeader>

    <TeamsAdministratorRole></TeamsAdministratorRole>
    <TeamsMemberRole></TeamsMemberRole>

    <TeamsModalNewTeam />
    <TeamsModalLeaveTeam />
  </LayoutSettings>
</template>

<script setup lang="ts">
import { useTeamsStore } from '@/stores/teams'
import LayoutSettings from '@/layouts/LayoutSettings.vue'

import TeamsAdministratorRole from '@/views/teams/_partials/TeamsAdministratorRole.vue'
import TeamsHeader from '@/views/teams/_partials/TeamsHeader.vue'
import TeamsMemberRole from '@/views/teams/_partials/TeamsMemberRole.vue'
import TeamsModalLeaveTeam from '@/views/teams/_partials/TeamsModalLeaveTeam.vue'
import TeamsModalNewTeam from '@/views/teams/_partials/TeamsModalNewTeam.vue'

const teamsStore = useTeamsStore()
teamsStore.getTeams()
</script>

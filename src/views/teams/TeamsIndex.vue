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
import LayoutSettings from '@/layouts/LayoutSettings.vue'
import TeamsAdministratorRole from '@/components/Teams/TeamsAdministratorRole.vue'
import TeamsHeader from '@/components/Teams/TeamsHeader.vue'
import { useTeamsStore } from '@/stores/teams'
import TeamsModalNewTeam from '@/components/Teams/TeamsModalNewTeam.vue'
import TeamsMemberRole from '@/components/Teams/TeamsMemberRole.vue'
import TeamsModalLeaveTeam from '@/components/Teams/TeamsModalLeaveTeam.vue'

const teamsStore = useTeamsStore()
teamsStore.getTeams()
</script>

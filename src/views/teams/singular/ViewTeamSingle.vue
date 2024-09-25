<template>
  <LayoutSettings>
    <SingularTeamHeader v-if="team && team.users" :team="team" />
    <SingularTeamMembers v-if="team && team.users" :team="team" />

    <SingularTeamModalRenameTeam :team="team" />
  </LayoutSettings>
</template>

<script lang="ts" setup>
import LayoutSettings from '@/layouts/LayoutSettings.vue'
import SingularTeamHeader from './_partials/SingularTeamHeader.vue'
import SingularTeamMembers from '@/views/teams/singular/_partials/SingularTeamMembers.vue'
import SingularTeamModalRenameTeam from '@/views/teams/singular/_partials/SingularTeamModalRenameTeam.vue'
import { useTeamsStore } from '@/stores/teams'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const teamStore = useTeamsStore()
const route = useRoute()
const id = Number(route.params.teamId)

const team = computed(() => {
  return teamStore.teams[id]
})

teamStore.getTeam(id)
</script>

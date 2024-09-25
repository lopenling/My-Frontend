<template>
  <LayoutSettings>
    <SingularTeamHeader v-if="team" :team="team" />
    <SingularTeamMembers v-if="team" :team="team" />

    <SingularTeamModalRenameTeam :team="team" />
  </LayoutSettings>
</template>

<script lang="ts" setup>
import LayoutSettings from '@/layouts/LayoutSettings.vue'
import SingularTeamHeader from './_partials/SingularTeamHeader.vue'
import SingularTeamMembers from '@/views/teams/singular/_partials/SingularTeamMembers.vue'
import SingularTeamModalRenameTeam from '@/views/teams/singular/_partials/SingularTeamModalRenameTeam.vue'
import { type Team, useTeamsStore } from '@/stores/teams'
import { useRoute } from 'vue-router'
import { type Ref, ref } from 'vue'

const teamStore = useTeamsStore()
const route = useRoute()
const team = ref() as Ref<Team>
teamStore.getTeam(Number(route.params.teamId)).then((response) => (team.value = response))
</script>

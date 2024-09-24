<template>
  <CardHeader>
    <CardHeaderHeading>Member Role</CardHeaderHeading>
  </CardHeader>

  <SettingsCard class="divide-y">
    <SettingsCardRowLabelAndButtons
      v-for="team in teamsStore.memberTeams"
      :key="team.id"
      :url="`/teams/${team.id}`"
    >
      {{ team.name }}

      <template #buttons>
        <SettingsCardSubtleButton @click="leaveTeam(team.id)">
          Leave team
        </SettingsCardSubtleButton>
      </template>
    </SettingsCardRowLabelAndButtons>

    <SettingsCardRowMessage v-if="!teamsStore.hasMemberTeams">
      No teams joined yet
    </SettingsCardRowMessage>
  </SettingsCard>
</template>

<script setup lang="ts">
import CardHeader from '@/components/CardHeader/CardHeader.vue'
import CardHeaderHeading from '@/components/CardHeader/CardHeaderHeading.vue'
import SettingsCard from '@/components/SettingsCard/SettingsCard.vue'
import { useTeamsStore } from '@/stores/teams'
import SettingsCardRowMessage from '@/components/SettingsCard/SettingsCardRowMessage.vue'
import SettingsCardRowLabelAndButtons from '@/components/SettingsCard/SettingsCardRowLabelAndButtons.vue'
import SettingsCardSubtleButton from '@/components/SettingsCard/SettingsCardSubtleButton.vue'
import eventBus from '@/lib/eventBus'

const teamsStore = useTeamsStore()

function leaveTeam(id: number) {
  eventBus.emit('open::modal::team::leave', { id })
}
</script>

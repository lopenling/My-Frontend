<template>
  <ModalDialog :show="!!team" name="leaveTeamModal" max-width="lg">
    <p class="text-pretty">
      You will loose access to team {{ team.name }} and all of it's materials.
    </p>

    <template #title>Do You Really Want to Leave the Team?</template>
    <template #illustration>
      <ModalDialogIllustration
        :icon-component="IconLogout1"
        icon-class="translate-x-0.5"
        appearance="danger"
      />
    </template>

    <template #buttons>
      <ModalDialogButton appearance="danger" :close-modal="false" @click="leaveTeam">
        Yes, leave the team
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { useModalsStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'
import ModalDialog from '../ModalDialog/ModalDialog.vue'
import IconLogout1 from '../icons/streamline/regular/IconLogout1.vue'
import ModalDialogIllustration from '../ModalDialog/ModalDialogIllustration.vue'
import ModalDialogButton from '../ModalDialog/ModalDialogButton.vue'
import { useTeamsStore, type Team } from '@/stores/teams'
import type { Ref } from 'vue'

const modalStore = useModalsStore()
const team = storeToRefs(modalStore).leaveTeamModal as Ref<Team>
const teamStore = useTeamsStore()

function leaveTeam() {
  teamStore.leaveTeam(team.value.id).then(() => {
    modalStore.leaveTeamModal = false
    teamStore.getTeams()
  })
}
</script>

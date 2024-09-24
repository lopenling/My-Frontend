<template>
  <ModalDialog :show="open" max-width="lg">
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
import ModalDialog from '@/components/ModalDialog/ModalDialog.vue'
import IconLogout1 from '@/components/icons/streamline/regular/IconLogout1.vue'
import ModalDialogIllustration from '@/components/ModalDialog/ModalDialogIllustration.vue'
import ModalDialogButton from '@/components/ModalDialog/ModalDialogButton.vue'
import { type Team, useTeamsStore } from '@/stores/teams'
import { type Ref, ref } from 'vue'
import eventBus from '@/lib/eventBus'

const open = ref(false)
const team = ref() as Ref<Team>
const teamStore = useTeamsStore()

eventBus.on('open::modal::team::leave', ({ id }) => {
  team.value = teamStore.teams[id]
  open.value = true
})
eventBus.on('close::modal', () => {
  open.value = false
})

function leaveTeam() {
  eventBus.emit('open::alert', {
    appearance: 'success',
    message: 'Team left successfully',
  })
  teamStore.leaveTeam(team.value.id).then(() => {
    eventBus.emit('close::modal')
    teamStore.getTeams()
  })
}
</script>

<template>
  <ModalDialog
    :show="!!modalsStore.newTeamModal"
    name="newTeamModal"
    max-width="md"
    enable-initial-focus="smAndUp"
  >
    <form
      id="newTeamForm"
      class="mt-4 flex flex-col gap-x-4 gap-y-2.5 text-left"
      @submit.prevent="submit"
    >
      <BaseInputText
        id="teamName"
        v-model="teamName"
        appearance="white"
        type="text"
        name="teamName"
        inputmode="text"
        pattern="[a-zA-Z0-9_\-\(\)][a-zA-Z0-9_\-\(\) ]{1,49}"
        autocomplete="off"
        title="2-50 letters, no special characters except _ - ( )"
        required
      />
    </form>

    <template #title>Give the Team a Name</template>
    <template #buttons>
      <ModalDialogButton appearance="primary" :close-modal="false" type="submit" form="newTeamForm">
        Create team
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>

<script setup lang="ts">
import { useModalsStore } from '@/stores/modals'
import { useTeamsStore } from '@/stores/teams'
import { ref } from 'vue'
import BaseInputText from '@/components/BaseInputText/BaseInputText.vue'
import ModalDialog from '@/components/ModalDialog/ModalDialog.vue'
import ModalDialogButton from '@/components/ModalDialog/ModalDialogButton.vue'

const modalsStore = useModalsStore()
const teamsStore = useTeamsStore()

let teamName = ref('')

function submit() {
  teamsStore
    .createTeam({
      name: teamName.value,
    })
    .then(() => {
      modalsStore.newTeamModal = false
      teamName.value = ''
      teamsStore.getTeams()
    })
}
</script>

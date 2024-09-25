<template>
  <ModalDialog :show="open" max-width="md" enable-initial-focus="smAndUp">
    <form
      id="teamNameForm"
      class="mt-4 flex flex-col gap-x-4 gap-y-2.5 text-left"
      @submit.prevent="submit"
    >
      <BaseInputText
        id="teamName"
        v-model="team.name"
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

    <template #title>Rename the Team</template>

    <template #buttons>
      <ModalDialogButton
        appearance="primary"
        :close-modal="false"
        type="submit"
        form="teamNameForm"
      >
        Apply new name
      </ModalDialogButton>
    </template>
  </ModalDialog>
</template>
<script setup lang="ts">
import ModalDialog from '@/components/ModalDialog/ModalDialog.vue'
import BaseInputText from '@/components/BaseInputText/BaseInputText.vue'
import { ref } from 'vue'
import ModalDialogButton from '@/components/ModalDialog/ModalDialogButton.vue'
import eventBus from '@/lib/eventBus'
import { useTeamsStore } from '@/stores/teams'

const teamStore = useTeamsStore()
const team = ref()
const open = ref(false)

eventBus.on('open::modal::team::rename', ({ id }) => {
  team.value = {
    id: id,
    name: teamStore.teams[id].name,
  }
  open.value = true
})

eventBus.on('close::modal', () => {
  open.value = false
})

function submit() {
  if (team.value) {
    teamStore.renameTeam(team.value.id, team.value.name)
    eventBus.emit('close::modal')
  }
}
</script>

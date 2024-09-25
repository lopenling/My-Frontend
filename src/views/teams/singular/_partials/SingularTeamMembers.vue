<template>
  <div v-if="team.role === TEAM_ROLES.admin">
    <CardHeader>
      <CardHeaderHeading>Members</CardHeaderHeading>
      <template #button>
        <CardHeaderButton
          :icon-component="IconAdd"
          :icon-stroke-width="2.5"
          :icon-expand-by="2.5"
          icon-class="-mx-px"
          @click="inviteMember"
        >
          New member
        </CardHeaderButton>
      </template>
    </CardHeader>

    <SettingsCard>
      <SettingsCardRowPersonDetailsWithButtons
        v-for="user in team.users"
        :key="user.email"
        :subdue-image="!!user.invite_pending"
        :user="user"
      >
        <template #extraData>
          {{ user.role }}
        </template>
        <template #buttons>
          <SettingsCardSubtleButton> Edit </SettingsCardSubtleButton>
        </template>
      </SettingsCardRowPersonDetailsWithButtons>
    </SettingsCard>
  </div>
</template>

<script lang="ts" setup>
import CardHeader from '@/components/CardHeader/CardHeader.vue'
import CardHeaderHeading from '@/components/CardHeader/CardHeaderHeading.vue'
import CardHeaderButton from '@/components/CardHeader/CardHeaderButton.vue'
import IconAdd from '@/components/icons/streamline/regular/IconAdd.vue'
import SettingsCard from '@/components/SettingsCard/SettingsCard.vue'
import SettingsCardRowPersonDetailsWithButtons from '@/components/SettingsCard/SettingsCardRowPersonDetailsWithButtons.vue'
import SettingsCardSubtleButton from '@/components/SettingsCard/SettingsCardSubtleButton.vue'
import { type Team, TEAM_ROLES } from '@/stores/teams'

const props = defineProps<{
  team: Team
}>()

function inviteMember() {
  console.log('inviteMember')
}
</script>

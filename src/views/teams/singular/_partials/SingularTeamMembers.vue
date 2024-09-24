<template>
  <div v-if="ROLE === 'admin'">
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
        v-for="user in USERS"
        :key="user.email"
        :subdue-image="true"
        :user="user"
      >
        <template #extraData>
          {{ ROLE }}
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
import type { User } from '@/stores/user'
import SettingsCardSubtleButton from '@/components/SettingsCard/SettingsCardSubtleButton.vue'

const ROLE = 'admin'

const USERS: User[] = [
  {
    first_name: 'Peeter',
    last_name: 'Baan',
    full_name: 'Peeter Baan',
    avatar: 'https://avatars.githubusercontent.com/u/124766713',
    email: 'peeter@baan.com',
    created_at: '2024-03-12',
    invite_pending: false,
    updated_at: '2024-03-12',
    default_login_method: 'social',
  },
  {
    first_name: 'Peeter2',
    last_name: 'Baan2',
    full_name: 'Peeter Baan2',
    avatar: 'https://avatars.githubusercontent.com/u/124766713',
    email: 'peeter@baan.com2',
    created_at: '2024-03-12',
    invite_pending: true,
    updated_at: '2024-03-12',
    default_login_method: 'social',
  },
]

function inviteMember() {
  console.log('inviteMember')
}
</script>

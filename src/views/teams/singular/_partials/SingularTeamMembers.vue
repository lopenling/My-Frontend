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
        v-for="user in sortedUsers"
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
import { type Team, TEAM_ROLES, useTeamsStore } from '@/stores/teams'
import { computed } from 'vue'
import { type User, useUserStore } from '@/stores/user'

const props = defineProps<{
  team: Team
}>()
const teamStore = useTeamsStore()
const userStore = useUserStore()

const filteredUsers = computed(() => {
  if (!teamStore.userFilter) {
    return props.team.users
  }
  return props.team.users.filter((user) => user.id === teamStore.userFilter?.value)
})

const sortedUsers = computed(() => {
  /*
  First remove self, from sorting. Self is always first
  Then select and sort all users that have invite pending and are admins
  Then select all users that have invite pending and are just regular users
  Then select all "active" users, separate them to admins and members
  Sort those admins and members by alphabetical order, always falling back to email
  Slap them all back to array in right order:
   - Alphabetical admins
   - Alphabetical members
   - Alphabetical invited admins
   - Alphabetical invited members
  */

  let self: User | undefined
  let invitedAdmins: User[] = []
  let invitedMembers: User[] = []
  let admins: User[] = []
  let members: User[] = []

  self = filteredUsers.value.find((user) => user.id === userStore.user!.id)
  let usersList = filteredUsers.value

  // No filter applied, self exist, remove it from list
  if (self) {
    usersList = filteredUsers.value.filter((user) => user.id !== userStore.user!.id)
  }

  usersList.forEach((user) => {
    // Separate invited and active users
    if (user.invite_pending) {
      // Separate invited users by role
      if (user.role === TEAM_ROLES.admin) {
        invitedAdmins.push(user)
      } else {
        invitedMembers.push(user)
      }
    } else {
      // Separate active users by role
      if (user.role === TEAM_ROLES.admin) {
        admins.push(user)
      } else {
        members.push(user)
      }
    }
  })

  const returnData = [
    ...admins.sort((a, b) => sortUsers(a, b)),
    ...members.sort((a, b) => sortUsers(a, b)),
    ...invitedAdmins.sort((a, b) => sortUsers(a, b)),
    ...invitedMembers.sort((a, b) => sortUsers(a, b)),
  ]

  if (self) {
    returnData.unshift(self)
  }

  return returnData
})

function sortUsers(a: User, b: User) {
  const aName = a.fullName || a.email
  const bName = b.fullName || b.email
  return aName.localeCompare(bName)
}

function inviteMember() {
  console.log('inviteMember')
}
</script>

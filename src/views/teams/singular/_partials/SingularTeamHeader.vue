<template>
  <div>
    <SettingsStats v-if="team.role === TEAM_ROLES.admin">
      <SettingsStatsDatum :icon-component="IconSingleNeutral">
        {{ team.users.length }} members
      </SettingsStatsDatum>
      <!--      <SettingsStatsDatum :icon-component="IconBookEdit">-->
      <!--        <span> 0 / {{ MAX_CUSTOM_DICTIONARIES }}</span>-->
      <!--      </SettingsStatsDatum>-->
    </SettingsStats>

    <SettingsTitle>
      <SettingsTitleText>{{ team.name }}</SettingsTitleText>
      <template #options>
        <div class="py-1">
          <SettingsTitleOption @click="renameTeam"> Rename team </SettingsTitleOption>
        </div>
        <div class="py-1">
          <SettingsTitleOption @click="removeTeam"> Delete team </SettingsTitleOption>
        </div>
      </template>
    </SettingsTitle>

    <div v-if="team.users.length > 1" class="-mt-4 mb-12 grid auto-cols-fr grid-cols-12 gap-4">
      <div class="col-span-full md:col-span-6">
        <BaseCombobox v-model="teamStore.userFilter" :options="filterOptions">
          <BaseComboboxInput placeholder="Filter by member" appearance="gray" />
        </BaseCombobox>
      </div>
      <div v-if="teamStore.userFilter" class="col-span-full self-center md:col-span-6">
        <BaseActionLink class="text-sm" @click="clearFilter"> Clear filter </BaseActionLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import IconBookEdit from '@/components/icons/streamline/regular/IconBookEdit.vue'
import IconSingleNeutral from '@/components/icons/streamline/regular/IconSingleNeutral.vue'
import SettingsStatsDatum from '@/components/SettingsStats/SettingsStatsDatum.vue'
import SettingsStats from '@/components/SettingsStats/SettingsStats.vue'
import SettingsTitle from '@/components/SettingsTitle/SettingsTitle.vue'
import SettingsTitleText from '@/components/SettingsTitle/SettingsTitleText.vue'
import SettingsTitleOption from '@/components/SettingsTitle/SettingsTitleOption.vue'
import BaseCombobox from '@/components/BaseCombobox/BaseCombobox.vue'
import BaseComboboxInput from '@/components/BaseCombobox/BaseComboboxInput.vue'
import BaseActionLink from '@/components/BaseActionLink/BaseActionLink.vue'
import eventBus from '@/lib/eventBus'
import { useRoute } from 'vue-router'
import { type Team, TEAM_ROLES, useTeamsStore } from '@/stores/teams'
import { computed } from 'vue'

// TODO: Ask over from Aunt, what's that about
// const MAX_CUSTOM_DICTIONARIES = '3'

const route = useRoute()
const props = defineProps<{
  team: Team
}>()
const teamStore = useTeamsStore()

const filterOptions = computed(() => {
  let users = props.team.users

  return (
    users
      // Sort invited users to be last ones
      .sort((a, b) => {
        return Number(b.invite_pending) - Number(a.invite_pending)
      })
      .map((user) => {
        return {
          label: user.fullName || user.email,
          value: user.id,
        }
      })
  )
})

function renameTeam() {
  eventBus.emit('open::modal::team::rename', { id: Number(route.params.teamId) })
}

function removeTeam() {
  console.log('Remove team!')
}

function clearFilter() {
  teamStore.userFilter = null
}
</script>

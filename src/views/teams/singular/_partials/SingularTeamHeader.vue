<template>
  <div>
    <SettingsStats v-if="USER_IS_ADMIN_IN_TEAM">
      <SettingsStatsDatum :icon-component="IconSingleNeutral"> 10 members </SettingsStatsDatum>
      <SettingsStatsDatum :icon-component="IconBookEdit">
        <span> 0 / {{ MAX_CUSTOM_DICTIONARIES }}</span>
      </SettingsStatsDatum>
    </SettingsStats>

    <SettingsTitle>
      <SettingsTitleText> Peeter baan! </SettingsTitleText>
      <template #options>
        <div class="py-1">
          <SettingsTitleOption @click="renameTeam"> Rename team </SettingsTitleOption>
        </div>
        <div class="py-1">
          <SettingsTitleOption @click="removeTeam"> Delete team </SettingsTitleOption>
        </div>
      </template>
    </SettingsTitle>

    <div v-if="USERS.length > 1" class="-mt-4 mb-12 grid auto-cols-fr grid-cols-12 gap-4">
      <div class="col-span-full md:col-span-6">
        <BaseCombobox v-model="USER_IN_FILTER" :options="SORTED_USERS">
          <BaseComboboxInput placeholder="Filter by member" appearance="gray" />
        </BaseCombobox>
      </div>
      <div v-if="USER_IN_FILTER" class="col-span-full self-center md:col-span-6">
        <BaseActionLink class="text-sm" @click="clearFilter"> Clear filter </BaseActionLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconBookEdit from '@/components/icons/streamline/regular/IconBookEdit.vue'
import IconSingleNeutral from '@/components/icons/streamline/regular/IconSingleNeutral.vue'
import SettingsStatsDatum from '@/components/SettingsStats/SettingsStatsDatum.vue'
import SettingsStats from '@/components/SettingsStats/SettingsStats.vue'
import SettingsTitle from '@/components/SettingsTitle/SettingsTitle.vue'
import SettingsTitleText from '@/components/SettingsTitle/SettingsTitleText.vue'
import SettingsTitleOption from '@/components/SettingsTitle/SettingsTitleOption.vue'
import BaseCombobox from '@/components/BaseCombobox/BaseCombobox.vue'
import BaseComboboxInput from '@/components/BaseCombobox/BaseComboboxInput.vue'
import { ref } from 'vue'
import BaseActionLink from '@/components/BaseActionLink/BaseActionLink.vue'

// TODO: Ask over from Sidrun, what's that about
const MAX_CUSTOM_DICTIONARIES = '3'

const USER_IS_ADMIN_IN_TEAM = true
const USERS = [1, 2]

const USER_IN_FILTER = ref(null)
const SORTED_USERS = [
  { label: 'peeter', value: 1 },
  { label: 'baan', value: 2 },
]

function renameTeam() {
  console.log('Rename team!')
}

function removeTeam() {
  console.log('Remove team!')
}

function clearFilter() {
  USER_IN_FILTER.value = null
}
</script>

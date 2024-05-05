<template>
  <SettingsTitle>
    <SettingsTitleText>Teams</SettingsTitleText>
  </SettingsTitle>

  <div v-if="invites.length" class="-mt-4 mb-12 flex flex-col gap-y-4 sm:gap-y-2">
    Invites not implemented
  </div>
</template>

<script setup lang="ts">
import SettingsTitleText from '@/components/SettingsTitle/SettingsTitleText.vue'
import SettingsTitle from '@/components/SettingsTitle/SettingsTitle.vue'
import { ref } from 'vue'

let invites = ref([])
</script>

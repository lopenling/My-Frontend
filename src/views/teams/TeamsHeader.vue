<template>
  <SettingsTitle>
    <SettingsTitleText>Teams</SettingsTitleText>
  </SettingsTitle>

  <!-- Invite accept and decline -->
  <div class="-mt-4 mb-12 flex flex-col gap-y-4 sm:gap-y-2">
    <SettingsNotification v-for="invite in invites" :key="invite.id">
      <SettingsNotificationText>
        {{ invite.invited_by.full_name }}
        invites you to become a team
        <span class="font-semibold">{{ invite.team.name }}</span>
        <span class="lowercase">
          {{ ' ' + invite.role }}.
        </span>
      </SettingsNotificationText>

      <template #buttons>
        <SettingsNotificationButton
          :separator="true"
          @click="reject(invite.id)"
        >
          Reject
        </SettingsNotificationButton>
        <SettingsNotificationButton
          @click="accept(invite.id)"
        >
          Accept
        </SettingsNotificationButton>
      </template>
    </SettingsNotification>
  </div>
</template>

<script setup lang="ts">
import SettingsTitleText from '@/components/SettingsTitle/SettingsTitleText.vue'
import SettingsTitle from '@/components/SettingsTitle/SettingsTitle.vue'
import SettingsNotification from '@/components/SettingsNotification/SettingsNotification.vue';
import { ref } from 'vue'
import SettingsNotificationText from '@/components/SettingsNotification/SettingsNotificationText.vue';
import SettingsNotificationButton from '@/components/SettingsNotification/SettingsNotificationButton.vue';

let invites = ref([
  {
    id: 10,
    invited_by: {
      full_name: 'McSneaky Cooper',
    },
    team: {
      name: 'Sneakytron Mining INC',
    },
    role: 'administrator',
  },
])

function reject(id) {
  console.log('Rejected!');
}

function accept(id) {
  console.log('Accept!');
}
</script>

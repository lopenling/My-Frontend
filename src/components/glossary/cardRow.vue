<template>
    <div :class="[index == 0 ? '' : 'border-t']">
      <div class="flex items-center justify-between gap-2 px-4">
        <VueToggle
          :label="dictionary.name"
          :labelExtra="labelExtra(dictionary)"
          :value="dictionary.enabled"
          :disabled="!dictionary.enabled"
          className="py-4"
          size="medium"
          :toggleSwitchLabelOpacity="true"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import VueToggle from "./toggle.vue";
  const { dictionary, users, index } = defineProps({
    dictionary: { type: Object },
    index: { type: Number },
  });
  
  function labelExtra(dictionary) {
    if (!dictionary.enabled) {
      return " — Unavailable";
    }
  }
  </script>
  
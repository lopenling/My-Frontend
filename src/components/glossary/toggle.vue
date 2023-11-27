<template>
  <SwitchGroup
    as="div"
    :class="[className && className, 'flex items-center']"
  >
    <Switch
      v-model="isChecked"
      :class="[
        isChecked && color == 'primary' && 'bg-primary-600',
        isChecked && color == 'secondary' && 'bg-secondary-600',
        !isChecked && 'bg-stone-200',
        size == 'large' && 'h-6 w-11',
        size == 'medium' && 'h-5 w-9',
        size == 'small' && 'h-4 w-7',
        color == 'primary' && 'focus-visible:ring-primary-600',
        color == 'secondary' && 'focus-visible:ring-secondary-600',
        'peer relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2',
        isChecked && disabled && 'bg-stone-300',
      ]"
      :disabled="disabled"
      @update:model-value="handleChange"
    >
      <span
        aria-hidden="true"
        :class="[
          isChecked && size == 'large' && 'translate-x-5',
          isChecked && size == 'medium' && 'translate-x-4',
          isChecked && size == 'small' && 'translate-x-3',
          !isChecked && 'translate-x-0',
          size == 'large' && 'h-5 w-5',
          size == 'medium' && 'h-4 w-4',
          size == 'small' && 'h-3 w-3',
          'pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        ]"
      />
    </Switch>
  
    <SwitchLabel
      as="span"
      :passive="passiveLabel"
      :class="[
        size == 'large' && 'ml-4',
        size == 'medium' && 'ml-4',
        size == 'small' && 'ml-4',
        'text-sm font-medium text-stone-700',
        targetSwitchLabel &&
          targetSwitchLabel.className &&
          targetSwitchLabel.className,
        !passiveLabel && !disabled && 'cursor-pointer',
        toggleSwitchLabelOpacity && 'opacity-50 peer-aria-checked:opacity-100',
      ]"
    >
      <span v-if="team.name">{{ team.name }} </span>
      <span
        v-if="labelExtra"
        class="text-stone-500"
      >
        {{ " " }}{{ labelExtra }}
      </span>
    </SwitchLabel>
  </SwitchGroup>
</template>
  
  <script setup>
  const {
    value,
    team,
    labelExtra,
    passiveLabel,
    className,
    disabled,
    size,
    color,
    toggleSwitchLabelOpacity,
    targetSwitchLabel,
  } = defineProps({
    value: { type: Boolean, default: true },
    team: { type: Object },
    labelExtra: { type: String },
    passiveLabel: { type: Boolean, default: false },
    className: { type: String },
    disabled: { type: Boolean },
    size: { type: String, default: "large" },
    color: { type: String, default: "primary" },
    toggleSwitchLabelOpacity: { type: Boolean, default: false },
    targetSwitchLabel: { type: Object },
  });
  
  import { onMounted, ref, watch } from "vue";
  import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

  //emit 
  const emit = defineEmits(['handleChecked'])
  
  // state
  const isChecked = ref(false);

  onMounted(() => {
    isChecked.value = value
  })

  const handleChange = () => {
    emit('handleChecked', {
      isChecked: isChecked.value
    })
  }
  </script>
  
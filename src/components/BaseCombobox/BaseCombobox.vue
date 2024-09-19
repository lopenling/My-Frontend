<template>
  <Combobox
    :model-value="modelValue"
    as="div"
    by="value"
    nullable
    class="group"
    @update:model-value="(value) => $emit('update:modelValue', value)"
  >
    <slot name="default" />
  </Combobox>
</template>
<script setup lang="ts">
import { Combobox } from '@headlessui/vue'
import type { ComboboxOption } from '@/components/BaseCombobox/BaseCombobox'
import { computed, provide, ref } from 'vue'

const props = defineProps<{
  modelValue: any
  options?: ComboboxOption[]
  storeKey?: string
}>()
defineEmits(['update:modelValue'])

const query = ref('')
provide('query', query)

/**
 * filteredOptions
 *
 * If the query is empty return all options. Otherwise, filter the options array
 * to only include options that include the query string.
 */

let filteredOptions = computed(() => {
  if (props.options) {
    let values: ComboboxOption[]

    if (query.value === '') {
      values = props.options
    } else {
      values = props.options.filter((option) =>
        option?.label
          .toLowerCase()
          /** Remove whitespace from both the query and the option label */
          .replace(/\s+/g, '')
          /** Check if the option label includes the query */
          .includes(query.value.toLowerCase().replace(/\s+/g, '')),
      )
    }

    return values
  }
  return null
})

provide('filteredOptions', filteredOptions)
</script>

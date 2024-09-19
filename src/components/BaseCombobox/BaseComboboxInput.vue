<template>
  <div class="relative z-10">
    <ComboboxInput
      v-bind="$attrs"
      :display-value="(option: any) => option?.label"
      :class="[
        appearance == 'white'
          ? 'bg-white'
          : appearance == 'transparent'
            ? 'bg-transparent'
            : appearance == 'gray'
              ? 'bg-stone-50 focus:bg-primary-50 focus:text-primary-800'
              : 'bg-stone-50 focus:bg-primary-50 focus:text-primary-800',
        shadow && 'shadow-sm',
        'w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-stone-800 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6',
      ]"
      @change="query = $event.target.value"
    />
    <ComboboxButton
      class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3.5 text-stone-400 transition focus:outline-none group-[:has(input:focus)]:text-primary-500"
    >
      <IconArrowDown1 class="h-3.5 w-3.5" />
    </ComboboxButton>

    <TransitionRoot
      enter="transition ease-out duration-200"
      enter-from="transform opacity-0 -translate-y-1"
      enter-to="opacity-100 translate-y-0"
      leave="transition ease-in duration-75"
      leave-from="transform opacity-100 translate-y-0"
      leave-to="opacity-0 -translate-y-1"
      @after-leave="query = ''"
    >
      <ComboboxOptions
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <div
          v-if="filteredOptions.length === 0 && query !== ''"
          class="relative cursor-default select-none px-3 py-2 text-stone-700"
        >
          Nothing found.
        </div>
        <ComboboxOption
          v-for="option in filteredOptions"
          :key="option.value"
          v-slot="{ selected, active }"
          as="template"
          :value="option"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-10',
              active ? 'bg-primary-300 text-primary-900' : 'text-stone-800',
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ option?.label }}
            </span>

            <span
              v-if="selected"
              :class="[
                ' absolute inset-y-0 right-0 flex items-center pr-3.5',
                active ? 'text-primary-900' : 'text-primary-600',
              ]"
            >
              <IconCheck1 class="h-3.5 w-3.5" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </TransitionRoot>
  </div>
</template>
<script setup lang="ts">
import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from '@headlessui/vue'
import { inject, type Ref } from 'vue'
import type { ComboboxOption as Option } from '@/components/BaseCombobox/BaseCombobox'
import IconArrowDown1 from '@/components/icons/streamline/regular/IconArrowDown1.vue'
import IconCheck1 from '@/components/icons/streamline/regular/IconCheck1.vue'

defineProps<{
  appearance?: 'gray' | 'white' | 'transparent'
  shadow?: boolean
}>()

const query = inject('query') as Ref<string>
const filteredOptions = inject('filteredOptions') as Option[]
</script>

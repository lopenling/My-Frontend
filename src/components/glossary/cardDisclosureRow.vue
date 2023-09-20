<template>
  <Disclosure
    as="div"
    :class="[index == 0 ? '' : 'border-t']"
    v-slot="{ open }"
  >
    <div class="flex items-center justify-between gap-2 px-4">
      <VueToggle
        :label="dictionary.name"
        :value="dictionary.enabled"
        className="py-4"
        size="medium"
        :toggleSwitchLabelOpacity="true"
      />

      <div>
        <DisclosureButton
          class="rounded-md p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-500"
        >
          <VueIcon
            v-if="open"
            :svg="
              IconArrowUp1({
                className: 'h-4 w-4',
                ariaHidden: 'true',
              })
            "
          />
          <VueIcon
            v-else
            :svg="
              IconArrowDown1({
                className: 'h-4 w-4',
                ariaHidden: 'true',
              })
            "
          />
        </DisclosureButton>
      </div>
    </div>
    <DisclosurePanel passive>
        <div class="pb-6">
          <VueAccountRow
            v-for="(person, index) in users"
            :key="person.id"
            :index="index"
            :person="person"
            :enabled="dictionary.enabled"
          />
        </div>
      </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
  import VueIcon from '@/components/icon/vueIcon.vue'
  import VueToggle from './toggle.vue'
  import VueAccountRow from './accountRow.vue'
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  import { IconArrowDown1, IconArrowUp1 } from "@/scripts/icons/streamline/regular.mjs";
 
  const { dictionary, users, index } = defineProps({
  dictionary: { type: Object },
  users: { type: Array },
  index: { type: Number },
});
</script>
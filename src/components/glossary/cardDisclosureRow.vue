<template>
  <Disclosure
    as="div"
    :class="[index == 0 ? '' : 'border-t']"
    v-slot="{ open }"
  >
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
    <DisclosurePanel>
      <div class="pb-6" >
        <div v-for="(person, index) in users">
          {{ person.email }}
        </div>
        
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
  import VueIcon from '@/components/icon/vueIcon.vue'

  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from '@headlessui/vue'

  import {
  IconArrowDown1,
  IconArrowUp1,
} from "@/scripts/icons/streamline/regular.mjs";

  const { dictionary, users, index } = defineProps({
  dictionary: { type: Object },
  users: { type: Array },
  index: { type: Number },
});
</script>
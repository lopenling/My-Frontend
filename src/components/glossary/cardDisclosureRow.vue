<template>
  <Disclosure
    as="div"
    :class="[index == 0 ? '' : 'border-t']"
    v-slot="{ open }"
  >
    <div class="flex items-center justify-between gap-2 p-3">
      <div class="flex">
        <button @click="openModal" class="rounded-md p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600">
          <PencilSquareIcon class="h-5 w-5 " aria-hidden="true" />
        </button>
        <button @click="onDeleteDictionary" class=" pr-3 rounded-md p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600">
          <TrashIcon class="h-5 w-5 " aria-hidden="true" />
        </button>
        <span class="p-2 text-stone-600 hover:text-stone-900"> {{ dictionary.name }} </span>
      </div>
    
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
  <UpdataModal 
    @closeModal="closeModal"
    :dictionary="dictionary" 
    :open="open" 
   />
</template>

<script setup>
import { ref, inject } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { IconArrowDown1, IconArrowUp1 } from "@/scripts/icons/streamline/regular.mjs";
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import { useMutation } from '@vue/apollo-composable'
import { DELETE_DICTIONARY } from '@/graphql/mutations.js'
import { GET_DICTIONARIES } from '@/graphql/queries.js';

// components
import VueIcon from '@/components/icon/vueIcon.vue'
import VueAccountRow from './accountRow.vue'
import UpdataModal from './dictionaryUpdataModal.vue';

// props
const { dictionary, users, index } = defineProps({
dictionary: { type: Object },
users: { type: Array },
index: { type: Number },
});

//inject
const reloadDictionary = inject('reloadDictionary')

// state
const open = ref(false)
const queryLoading = ref(false)

// methods: 
const onDeleteDictionary = () => {
  const alertText = "Are you sure?"
  if(confirm(alertText) == true) {
    deleteMutation()
  }
}

const deleteMutation = async() => {
  const variables = {
    id: dictionary.id
  }
  const { mutate: deleteDictionary, onError, onDone, loading,  error} = await useMutation(DELETE_DICTIONARY, {variables: variables}, {refetchQueries: [GET_DICTIONARIES]})
    deleteDictionary()
    queryLoading.value = loading.value
    onDone(() => {
      const addDictionary = reloadDictionary()
      addDictionary.refetch()
      queryLoading.value = loading.value
    })
    onError(() => {
        queryLoading.value = loading.value
       alert(`${error.value}`)
    })
}

const openModal = () => {
  open.value = true
} 

const closeModal = () => {
  open.value = false
} 
  
</script>
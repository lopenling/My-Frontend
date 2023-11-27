<template>
  <Disclosure
    v-if="!queryLoading.value"
    v-slot="{ open }"
    as="div"
    :class="[index == 0 ? '' : 'border-t']"
  >
    <div class="flex items-center justify-between gap-2 p-3">
      <div class="flex">
        <button
          class="rounded-md p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
          @click="openModal"
        >
          <PencilSquareIcon
            class="h-5 w-5 "
            aria-hidden="true"
          />
        </button>
        <button
          class=" pr-3 rounded-md p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
          @click="onDeleteDictionary"
        >
          <TrashIcon
            class="h-5 w-5"
            aria-hidden="true"
          />
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
      <div
        v-if="teamList.value.length"
        class="pb-6"
      >
        <VueAccountRow
          v-for="(team, index) in teamList.value"
          :key="team.id"
          :index="index"
          :assigned="isAssigned(team.dictionary_permission)"
          :team="team"
          :enabled="true"
          :dictionary="dictionary"
        />
      </div>
      <div
        v-else
        class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6"
      >
        <h3 class="text-base leading-6 text-gray-500 text-center">
          There is no team available
        </h3>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <UpdataModal 
    :dictionary="dictionary"
    :open="open" 
    @closeModal="closeModal" 
  />
</template>

<script setup>
import { ref, inject, reactive, onMounted } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { IconArrowDown1, IconArrowUp1 } from "@/scripts/icons/streamline/regular.mjs";
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { DELETE_DICTIONARY } from '@/graphql/mutations.js'
import { GET_DICTIONARIES, GET_TEAM_BY_ORG_PK } from '@/graphql/queries.js';

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
const teamList = reactive([])


onMounted(() => {
 getTeamList()
})

// methods: 
const getTeamList = async () => {
  let variables = {
    org_id: dictionary.organization_id 
  }
  const {result, error, loading, onResult,  onError} = await useQuery(GET_TEAM_BY_ORG_PK, variables)
  queryLoading.value = loading.value
  onResult(() => {
    if(result.value) {
      queryLoading.value = loading.value
      teamList.value = result.value.team
    }
  })
  onError(() => {
    console.log("Error: ", error.value)
  })
}

const isAssigned = (dp) => {
  let assigned = null
  if(dp.length) {
    dp.forEach((t) => {
      if(t.dictionary_id == dictionary.id) {
        assigned = true
      } else {
        assigned = false
      }
    })
  }
  return assigned;
}

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
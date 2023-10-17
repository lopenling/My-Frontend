<template>
  <div
    :class="[
      index % 2 === 0 ? 'rounded-md bg-stone-50' : '',
      index == 0 ? '' : '',
      'relative mx-4 flex justify-between pl-2',
    ]"
  >
    <div class="flex gap-x-4 sm:w-1/2 sm:flex-none">
      <VueToggle
        @handleChecked="handleChecked"
        :team="team"
        :value="assigned"
        className="py-2 flex-none"
        :disabled="!enabled"
        size="small"
        color="secondary"
        :toggleSwitchLabelOpacity="true"
        :targetSwitchLabel="{
          className: '[&]:font-normal',
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { ADD_DICTIONARY_PERMISSION, DELETE_DICTIONARY_PERMISSION } from '@/graphql/mutations.js'

//components
import VueToggle from "./toggle.vue";

//props
const { team, index, enabled, dictionary, assigned } = defineProps({
  team: { type: Object },
  index: { type: Number },
  enabled: { type: Boolean },
  dictionary: { type:Object },
  assigned: { type: Boolean }
});

//state
const isChecked = ref(assigned)

//methods
const handleChecked = (item) => {
  if(item.isChecked) {
    assignTeam(item)
  } else {
    removeTeam(item)
  }
}

const assignTeam = async (item) => {
  const variables = {
    team_permission:  {
      team_id: team.id,
      dictionary_id: dictionary.id
    }
  }
  const { mutate: createDictionary, onError, onDone, error , loading} = await useMutation(ADD_DICTIONARY_PERMISSION, {variables})
  createDictionary()
  onDone(() => {
    isChecked.value = item.isChecked
    alert(`Assigned:\n Dictionary '${dictionary.name}' to Team '${team.name}'`)
  })
  onError(() => {
     alert(`${error.value}`)
  })
}

const removeTeam = async (item) => {
  const variables = {
    dictionary_id: dictionary.id,
    team_id: team.id
  }
  const { mutate: createDictionary, onError, onDone, error , loading} = await useMutation(DELETE_DICTIONARY_PERMISSION, {variables})
  createDictionary()
  onDone(() => {
    isChecked.value = item.isChecked
    alert("Removed")
  })
  onError(() => {
     alert(`${error.value}`)
  })
}
</script>
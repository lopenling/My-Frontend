<template>
    <div v-if="!queryLoading" class="mx-auto max-w-3xl">
      <div
        class="mb-12 flex flex-row flex-wrap gap-x-6 gap-y-1 sm:mb-6 sm:justify-end"
      >
        <div class="mt-2 flex items-center text-sm text-stone-500">
          <div
            v-html="IconBookEdit({
              className: 'mr-1.5 h-5 w-5 flex-shrink-0 text-stone-400',
              ariaHidden: 'true',
            })"
          />
          {{customDictionaries.value.length}} custom
        </div>

        <div class="mt-2 flex items-center text-sm text-stone-500">
            
          <div
            v-html="IconBookClose2({
              className: 'mr-1.5 h-5 w-5 flex-shrink-0 text-stone-400',
              ariaHidden: 'true',
            })"
          />
          {{nativeDictionaries.value.length}} native
        </div>

      </div>
      <CustomDictionaries :dictionaries="customDictionaries.value" :org="organizationList"/>
      <NativeDictionaries :dictionaries="nativeDictionaries.value" :org="organizationList"/>
    </div>
</template>
<script setup>
import { provide, onMounted, reactive, ref } from "vue";
import CustomDictionaries from "./customDictionaries.vue";
import NativeDictionaries from "./nativeDictionaries.vue"
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_DICTIONARIES, GET_USER_ORGANIZATIONS } from '@/graphql/queries.js';
import {
  IconBookClose2,
  IconBookEdit,
  IconSingleNeutral,
} from "@/scripts/icons/streamline/regular.mjs";

const dictionaries = reactive([])
const organizationList = reactive([])
const nativeDictionaries = reactive([])
const customDictionaries = reactive([])
const queryLoading = ref(true)

onMounted(() => {
  loadDictionaries();
  loadOrgaizations();
})


const loadDictionaries = () => {
  const addDictionary = useQuery(GET_DICTIONARIES, {'fetchPolicy': 'no-cache'});
  addDictionary.onResult(() => {
    if(addDictionary.result.value) {
      dictionaries.value = addDictionary.result.value.data_dictionary;
      filterDictionaries(dictionaries.value)
      queryLoading.value = addDictionary.loading.value
    }
  })
  addDictionary.onError(() => {
      console.log("error : ", addDictionary.error.value)
  })
  return addDictionary
}

const loadOrgaizations = () => {
  const { result, error, onResult, onError, loading } =  useQuery(GET_USER_ORGANIZATIONS, {'fetchPolicy': 'no-cache'});
  onResult(async () => {
    if(result.value) {
      organizationList.value = await result.value.organization
      console.log("org : ", organizationList.value)
    }
  })

  onError(() => {
      console.log("error : ", error)
  })
}
const filterDictionaries = (dictionaries) => {
  nativeDictionaries.value = dictionaries.filter(native => native.access_mode == "Public")
  customDictionaries.value = dictionaries.filter(native => native.access_mode == "Custom")
}

provide('reloadDictionary',loadDictionaries)
</script>
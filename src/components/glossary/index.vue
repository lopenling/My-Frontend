<template>
    <div class="mx-auto max-w-3xl">
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
          0/3 custom
        </div>

        <div class="mt-2 flex items-center text-sm text-stone-500">
            
          <div
            v-html="IconBookClose2({
              className: 'mr-1.5 h-5 w-5 flex-shrink-0 text-stone-400',
              ariaHidden: 'true',
            })"
          />
          18/30 native
        </div>

        <div class="mt-2 flex items-center text-sm text-stone-500">
          <div
            v-html="IconSingleNeutral({
              className: 'mr-1.5 h-5 w-5 flex-shrink-0 text-stone-400',
              ariaHidden: 'true',
            })"
          />
          3
        </div>
      </div>
      <CustomDictionaries />
      <NativeDictionaries />
    </div>
</template>
<script setup>
import CustomDictionaries from "./customDictionaries.vue";
import NativeDictionaries from "./nativeDictionaries.vue"
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_DICTIONARIES } from '@/graphql/queries.js';
import {
  IconBookClose2,
  IconBookEdit,
  IconSingleNeutral,
} from "@/scripts/icons/streamline/regular.mjs";
import { onMounted } from "vue";

onMounted(() => {
  loadDictionaries();
})

const loadDictionaries = async () => {
  const { result, error, onResult, onError, loading } = await useQuery(GET_DICTIONARIES);
  onResult(async () => {
    console.log("Dictionary: ", result.value.data_dictionary)
  })
  onError(() => {
      console.log("error : ", error)
  })
}

</script>
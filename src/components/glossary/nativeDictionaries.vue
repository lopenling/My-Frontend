<template>
    <div class="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
      <h3 class="text-base font-semibold leading-6 text-stone-900">
        Native dictionaries
      </h3>
      <div class="sm:ml-4">
        <button
          type="button"
          class="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          @click="openModal()"
        >
          Create new
        </button>
      </div>
    </div>
  
    <div class="-mx-4 overflow-hidden bg-white sm:mx-0 sm:rounded-lg sm:shadow">
    <div>
      <LocalVueCardDisclosureRow
        v-for="(dictionary, index) in dictionaries"
        :dictionary="dictionary"
        :users="users"
        :index="index"
      />
    </div>
    <div v-if="dictionaries.length == 0" class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 class="text-base leading-6 text-gray-500 text-center">There is no Native dictionaries available</h3>
    </div>
  </div>
  <DictionaryCreateModal :open="open" @closeModal="closeModal" :org="org.value" access_mode="Public" />
  </template>
  
<script setup>
  import { ref } from "vue";
  import LocalVueCardDisclosureRow from "./cardDisclosureRow.vue"
  import organisationUsersData from "@/scripts/data/organisationUsersData.mjs";
  import DictionaryCreateModal from "./dictionaryCreateModal.vue";

  const { dictionaries }= defineProps({
    dictionaries: {
      type: Array
    },
    org: {
      type: Array,
      default: []
    }
  })
  const users = organisationUsersData();
  const open = ref(false)

  const openModal = () => {
    open.value = true
  } 

  const closeModal = () => {
    open.value = false
  } 
  

</script>
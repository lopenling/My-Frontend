<template>
    <div class="mb-6 sm:flex sm:items-end sm:justify-between">
      <h3 class="text-base font-semibold leading-6 text-stone-900">
        Native dictionaries
      </h3>
      <div class="mt-3 sm:ml-4 sm:mt-0"></div>
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
    <div>
      <LocalVueCardRow
        v-for="(dictionary, index) in dictionaries"
        :dictionary="dictionary"
        :index="index"
      />
    </div>
  </div>
  </template>
  
  <script setup>
  import LocalVueCardDisclosureRow from "./cardDisclosureRow.vue"
  import LocalVueCardRow from "./cardRow.vue";
  import dictionariesData from "@/scripts/data/dictionariesData.mjs";
  import organisationUsersData from "@/scripts/data/organisationUsersData.mjs";

  const users = organisationUsersData();
  const dictionaries = dictionariesData();
  
  const enabledDictionaries = dictionaries.filter(
    (dictionary) => dictionary.enabled === true
  );
  </script>
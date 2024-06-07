<template>
  <div>
    <form ref="dictionaryForm" @submit.prevent="uploadDictionary">
      <label for="upload-dictionary">Upload dictionary</label>
      <input id="upload-dictionary" type="file" name="dictionary" @change="updateName">

      <input v-model="fileName" type="text" name="name" placeholder="Dictionary name">

      <input type="submit" >
    </form>

    <br>
    <hr>
    <br>
    Glossary!

    <form ref="termForm" @submit.prevent="findTerm">
      ཀ་ཀ་
      <select name="dictionaries[]" multiple>
        <option v-for="dictionary in dictionaries" :key="dictionary.id" :value="dictionary.id">{{ dictionary.name }}</option>
      </select>
      <input type="text" name="term" placeholder="Search by Tibetian">
      <input type="text" name="description" placeholder="Search by Description">
      <input type="submit" value="Search!" >
    </form>

    <br>
    <div v-for="result in results.slice(0, 10)">
      <b>{{ result.term }}</b>
      <pre name="Search result" placeholder="Search results">{{ result.description  }}</pre>
      <hr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { axios } from "@/lib/axios";
import { ref } from "vue"

let dictionaries = ref([])
let results = ref([])
const dictionaryForm = ref<HTMLFormElement | null>(null)
const termForm = ref<HTMLFormElement | null>(null)
const fileName = ref('')


axios.get('/v1/dictionaries')
  .then(({ data }) => {
    dictionaries.value = data
  })


function updateName(e) {
  if (!fileName.value) {
    fileName.value = e.target.files?.[0]?.name?.replace('.csv', '')
  }
}

function uploadDictionary(e) {
  let formData = new FormData(e.target)
  axios.post('/v1/dictionaries', formData)
    .then(() => window.location.reload())
}

function findTerm(e) {
  let formData = new FormData(e.target)

  axios.post('/v1/terms/search', formData)
    .then(({ data }) => results.value = data)
}
</script>

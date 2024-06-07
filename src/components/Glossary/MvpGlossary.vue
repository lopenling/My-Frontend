<template>
  <div>
    <ul>
      <li>Test dictionary ❌</li>
      <li>Chandra-Sanskrit(1) ❌</li>
    </ul>
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
      <input type="text" name="term" placeholder="Search by Tibetian">
      <input type="text" name="description" placeholder="Search by Description">
      <input type="submit" value="Search!" >
    </form>

    <br>
    <textarea name="Search result" placeholder="Search results"></textarea>
  </div>
</template>

<script setup lang="ts">
import { axios } from "@/lib/axios";
import { ref } from "vue"

const dictionaryForm = ref<HTMLFormElement | null>(null)
const termForm = ref<HTMLFormElement | null>(null)
const fileName = ref('')

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
  formData.append('dictionaries[]', '5')
  formData.append('dictionaries[]', '6')
  formData.append('dictionaries[]', '15')

  axios.post('/v1/terms/search', formData)
}
</script>

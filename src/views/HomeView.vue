<template>
  <div v-if="!user.value" class="loader">
    <svg
      width="60"
      height="60"
      class="mx-auto mt-10 animate-bounce w-10 h-10 ..."
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 3.91654e-05L256 0L256 256L204 256L203.999 141L187.999 149L188 193L67.9995 193V115H51.9995L51.9995 217L67.9995 209L188 209V256H3.91654e-05L9.63836e-06 63H120L120 140L136 132L136 47L7.19052e-06 47L0 3.91654e-05ZM188 4.16133e-05L188 106L204 98L204 3.91655e-05L188 4.16133e-05ZM230 128L256 115V141L230 128Z"
        fill="#92B780"></path>
    </svg> 
  </div>
  <div v-else>
    <Header :user="user.value" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from '@/components/headers.vue'
import { useAuth0Store } from '@/stores/auth0';
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_USER_ORGANIZATIONS } from '@/graphql/queries.js';
import { onMounted, reactive, watch } from 'vue';

const auth0Store = useAuth0Store()

//state
const user = reactive({})
const userOrganization = reactive([])

onMounted(async () => {
  getUserProfile();
  getUserOrganization();
})


const getUserProfile = async () => {
  const auth0Store = useAuth0Store()
  user.value = await auth0Store.getUserProfile()
}

const getUserOrganization = async () => {
  const { result, error, onResult, onError, loading } = await useQuery(GET_USER_ORGANIZATIONS, {'fetchPolicy': 'no-cache'});
  console.log("loding : ", result.value)
  onResult(async () => {
    userOrganization.value = await result.value.organization 
    console.log(userOrganization.value)
  })

  onError(() => {
      console.log("error : ", error)
  })
}

</script>
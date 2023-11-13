<template>
    <div
        v-if="!isLoading"
        class="sm:mt-10 border-b border-sm rounded border-gray-200 bg-white px-4 py-5 sm:px-6 mx-auto max-w-3xl"
    >
      <div class=" flow-root">
        <div class="mb-6 flex flex-wrap items-end justify-end gap-x-4 gap-y-3">
          
        <TeamCreateModal
          :admin="currentUser.value"
          :organization="organizationList"
          @getTeam="getTeam"
        />
        </div>
        <div class="mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" class=" py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">Organization</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">Admin</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">Members</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">Action</th>
                </tr>
              </thead>
              <tbody class="m-10 divide-y border-separate border-spacing-0 divide-gray-200 bg-white">
                <tr v-for="team in teamList.value" :key="team.id">
                  <td class=" whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="font-large text-base text-stone-600">{{ team.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-stone-500">
                  
                    <span  class="font-large text-base text-stone-600">
                      {{ team.organization.name }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-stone-500">
                    <div class="font-large text-base text-stone-600">
                        {{ team.admin.name }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-stone-500">
                    <TeamMember
                      :team="team"
                      @getTeam="getTeam"
                    />
                    <span class="font-large text-base inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-900 ring-1 ring-inset ring-green-700/10">
                      {{ team.team_members.length }} 
                    </span>
                    </td>
                  <td class="relative whitespace-nowrap pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                    <div v-if="currentUser.value.id == team.admin.id">
                        <TeamUpdateModal
                          :team="team"
                          @getTeam="getTeam"
                        />
                        <button 
                          @click="deleteTeam(team.id)"
                          class=" pr-3 rounded-md p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-600"
                        >
                            <TrashIcon class="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable'
import { DELETE_TEAM } from '@/graphql/mutations.js'
import { GET_USER_TEAM, GET_USER_BY_AUTH_ID, GET_USER_ORGANIZATIONS } from '@/graphql/queries.js';
import { useAuth0Store } from '@/stores/auth0';
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

//components
import TeamCreateModal from './teamCreateModal.vue';
import TeamMember from './teamMember.vue'
import TeamUpdateModal from './teamUpdateModal.vue'


//global store 
const userAuth0 = useAuth0Store()

//state
const teamList = reactive([])
const organizationList = reactive([])
const currentUser = reactive({})
const isLoading = ref(false)

onMounted(() => {
    getTeam()
    getUserInfo()
    getOrganization()
})


//methods
const getTeam = () => {
    const { result, error, onResult, onError, refetch } = useQuery(GET_USER_TEAM);
    onResult(() => {
      if(result.value) {
        teamList.value = result.value.team
      }
    })
    onError(() => {
        console.log("error organization: ", error)
  })
  refetch()

}
const getOrganization = () => {
    const { result, error, onResult, onError, refetch } = useQuery(GET_USER_ORGANIZATIONS);
    onResult(() => {
      if(result.value) {
        organizationList.value = result.value.organization
      }
    })
    onError(() => {
        console.log("error organization: ", error)
  })
  refetch()

}

const deleteTeam = (id) => {
  const variables = {
        team_id: id
    }
    const { mutate: deleteTeam, onError, onDone, error , loading} = useMutation(DELETE_TEAM, {variables})
    deleteTeam();
    onDone(() => {
        getTeam()
        console.log('deleted')
    })
    onError(() => {

       alert('Make sure you have deleted all members and removed dictionary permission to this team')
    })
} 

const getUserInfo = () =>  {
    const variables = {
        auth_id: userAuth0.userProfile.sub
    }
    const { result, error, onResult, onError, loading } = useQuery(GET_USER_BY_AUTH_ID, variables);
    isLoading.value = loading.value
    onResult(() => {
      if(result.value) {
        currentUser.value = result.value.user[0];
        isLoading.value = loading.value
      }
    })
    onError(() => {
        console.log("user error: ", error)
        isLoading.value = loading.value
  })
}
</script>
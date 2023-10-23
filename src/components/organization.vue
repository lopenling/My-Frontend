<template>
    <div
        v-if="!isLoading"
        class="sm:mt-10 border-b border-sm rounded border-gray-200 bg-white px-4 py-5 sm:px-6 mx-auto max-w-3xl"
    >
      <div class=" flow-root">
        <div class="mb-6 flex flex-wrap items-end justify-end gap-x-4 gap-y-3">
          
          <div class="sm:ml-4" >
            <button
              type="button"
              class="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Create new
            </button>
          </div>
        </div>
        <div class="mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" class=" py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Organization</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">Team</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">Admin</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">Members</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">Action</th>
                </tr>
              </thead>
              <tbody class="m-10 divide-y border-separate border-spacing-0 divide-gray-200 bg-white">
                <tr v-for="org in organizationList.value" :key="org.id">
                  <td class=" whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="font-large text-base text-stone-600">{{ org.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-stone-500">
                    
                    <span class="font-large text-base inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-900 ring-1 ring-inset ring-green-700/10">
                        {{ org.teams.length }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-stone-500">
                    <div class="font-large text-base text-stone-600">
                        {{ org.admin.name }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-stone-500">
                    <span class="flex">
                        <OrganizationMember 
                            v-if="currentUser.value.id == org.admin.id" 
                            :organization="org" 
                        />
                        <span v-else class="ml-3 text-center">
                            {{ org.organization_members.length }} 
                        </span>
                    </span>
                    </td>
                  <td class="relative whitespace-nowrap pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                    <div v-if="currentUser.value.id == org.admin.id">
                        <button class="rounded-md p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-600">
                            <PencilSquareIcon class="h-5 w-5 " aria-hidden="true" />
                        </button>
                        <button class=" pr-3 rounded-md p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600">
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
import { onMounted, reactive, ref } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_USER_ORGANIZATIONS, GET_USER_BY_AUTH_ID } from '@/graphql/queries.js';
import { useAuth0Store } from '@/stores/auth0';
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

//components
import OrganizationMember from '@/components/organizationMembers.vue'

//global store 
const userAuth0 = useAuth0Store()

//state
const organizationList = reactive([])
const currentUser = reactive({})
const isLoading = ref(false)

onMounted(() => {
    getOrganization()
    getUserInfo()
})

//methods
const getOrganization = async () => {
    const { result, error, onResult, onError } =  await useQuery(GET_USER_ORGANIZATIONS);
    onResult(() => {
      if(result.value) {
        organizationList.value = result.value.organization
      }
    })
    onError(() => {
        console.log("error organization: ", error)
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
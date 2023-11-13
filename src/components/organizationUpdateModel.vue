<template>
    <div>
        <button
            type="button"
            @click="openModal"
            class="rounded-md p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-600"
        >
            <PencilSquareIcon class="h-5 w-5 " aria-hidden="true" />
        </button>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-stone-400 bg-opacity-50" />
            </TransitionChild>
        
            <div class="fixed mx-auto max-w-xl inset-0 z-10 overflow-y-auto">
                <div
                    class="flex items-center justify-center mt-10 p-4 text-center"
                >
                    <TransitionChild
                      as="template"
                      enter="duration-300 ease-out"
                      enter-from="opacity-0 scale-95"
                      enter-to="opacity-100 scale-100"
                      leave="duration-200 ease-in"
                      leave-from="opacity-100 scale-100"
                      leave-to="opacity-0 scale-95"
                    >
                    <DialogPanel
                        class="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                    >
                        <DialogTitle
                          as="h3"
                          class="mt-2 text-lg font-medium leading-6 text-gray-700"
                        >   
                        <div class="m-4 mb-10 absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none" @click="closeModal">
                                <span class="sr-only">Close</span>
                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        </DialogTitle>
                        <div class=" m-5 absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                          <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closeModal">
                            <span class="sr-only">Close</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />

                          </button>
                        </div>
                        <form @submit.prevent="updateOrganization">
                            <div class="m-10">
                                <div class="my-5">
                                  <div class="mt-2">
                                        <label 
                                            for="name" 
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <input 
                                            type="text" 
                                            v-model="orgData.name" 
                                            name="name" 
                                            id="name" 
                                            required 
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                            placeholder="Dictionary name" 
                                            aria-describedby="description"
                                        />
                                  </div>
                                </div>
                                <div class="my-5">
                                  <div class="mt-2">
                                        <label for="logo" class="block text-sm font-medium leading-6 text-gray-900">Logo url</label>
                                        <input type="text" v-model="orgData.logo"  name="logo" id="logo" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Dictionary name" aria-describedby="description" />
                                  </div>
                                </div>
                            </div>
                            <div class="m-10 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-12">
                                <button  
                                    type="submit" 
                                    class="inline-flex w-full justify-center rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2" 
                                >
                                    <svg 
                                        v-if="mutationLoading"
                                        aria-hidden="true" 
                                        class="w-4 h-4 mr-2 text-white animate-spin dark:text-gray-600 fill-primary-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                  </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { 
    PencilSquareIcon,
    XMarkIcon
 } from '@heroicons/vue/24/outline'
 import { useMutation } from '@vue/apollo-composable'
 import { UPDATE_ORG } from '@/graphql/mutations.js'
 import { GET_USER_ORGANIZATIONS } from '@/graphql/queries.js';

//emit 
const emit = defineEmits(['getOrganization'])

 //props
const { organization } = defineProps({
    organization: { 
        type: Object,
        default: null
     }
})

//state
const orgData = reactive({
    name: organization.name,
    logo: organization.logo
})
const isOpen = ref(false)
const mutationLoading = ref(false)


//methods
const updateOrganization = () => {
    const variables = {
        org_id: organization.id,
        object: { ...orgData}
    }
    const { mutate: updateOrg, onError, onDone, error , loading} = useMutation(UPDATE_ORG, {variables}, {refetchQueries: [GET_USER_ORGANIZATIONS]})
    mutationLoading.value = loading
    updateOrg();
    onDone(() => {
        mutationLoading.value = !loading
        emit('getOrganization')
        closeModal()
        console.log('updated')
    })
    onError(() => {
        mutationLoading.value = !loading
       alert(`${error.value}`)
    })
}
const closeModal = () =>  {
    isOpen.value = false
}

const openModal = () => {
    isOpen.value = true
}
</script>
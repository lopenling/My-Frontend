<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" >
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-stone-100 bg-opacity-90 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form>
                    <div class=" m-5 absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                      <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closeModal">
                        <span class="sr-only">Close</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        
                      </button>
                    </div>
                    <div class="m-10">
                        <div class="my-5">
                          <div v-if="access_mode =='Custom'" class="mt-2">
                            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <input type="text" v-model="inputForm.name" name="name" id="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Dictionary name" aria-describedby="description" />
                          </div>
                          <div v-if="access_mode =='Public'"  class="mt-2">
                            <label for="nativename" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <select id="nativename" v-model="inputForm.name" name="nativename" required class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <option value="" disabled selected hidden>Please Choose...</option>
                              <option v-for="item in nativeDitionaryNameList" :key="item" :value="item">{{ item }}</option>
                            </select>
                          </div>
                        </div>
                    </div>
                    <div class="m-10">
                      <label for="org" class="block text-sm font-medium leading-6 text-gray-900">Organazation</label>
                      <select id="org" v-model="inputForm.organization_id" name="org" required class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value="" disabled selected hidden>Please Choose...</option>
                        <option v-for="o in org" :key="o.id" :value="o.id">{{ o.name}}</option>
                      </select>
                    </div>
                    <div class="m-10">
                      <label for="target" class="block text-sm font-medium leading-6 text-gray-900">Target</label>
                      <select id="target" v-model="inputForm.target" name="target" required class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value="" disabled selected hidden>Please Choose...</option>
                        <option>English</option>
                        <option>Tibetan</option>
                      </select>
                    </div>
                    <div class="m-10">
                      <label for="source" class="block text-sm font-medium leading-6 text-gray-900">Source</label>
                      <select id="source" v-model="inputForm.source" required name="source" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value="" disabled selected hidden>Please Choose...</option>
                        <option>English</option>
                        <option>Tibetan</option>
                      </select>
                    </div>
                    <div v-if="access_mode == 'Custom'" class="m-10 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-12">
                        <button @click.prevent="handleCustomSubmit()" type="submit" class="inline-flex w-full justify-center rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2" >
                            <svg v-if="customQueryLoading" aria-hidden="true" class="w-4 h-4 mr-2 text-white animate-spin dark:text-gray-600 fill-primary-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            Submit
                        </button>
                    </div>
                    <div v-if="access_mode == 'Public'" class="m-10 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-12">
                        <button @click.prevent="handleNativeSubmit()" type="submit" class="inline-flex w-full justify-center rounded-md bg-secondary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 sm:col-start-2" >
                            <svg v-if="nativeQueryLoading" aria-hidden="true" class="w-4 h-4 mr-2 text-white animate-spin dark:text-gray-600 fill-primary-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import { reactive, ref, inject } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useMutation } from '@vue/apollo-composable'
import { ADD_DICTIONARY, ADD_DICTIONARY_API } from '@/graphql/mutations.js'
import { GET_DICTIONARIES } from '@/graphql/queries.js';


//props
const { open, org, access_mode } = defineProps({
    open: {
        type: Boolean,
        default: false
    },
    org: {
      type: Array,
      default: []
    }, 
    access_mode: {
        type: String
    }
})

//state 
const inputForm = reactive ({
    name: '',
    organization_id: '',
    target: '',
    access_mode: access_mode,
    source: ''
})
const nativeDitionaryNameList = reactive (['Sera', 'Chandra Sanskrit', 'Dag Yig', 'Erik Pema Kunsang', 'Ives Waldo', 'Jeffrey Hopkins', 'Jim Welby', 'Laine Abbreviations', 'Monlam', 'Lotus King', 'Mahavyutpatti', 'Negi Sanskrit', 'Tibetan Medicine', 'Tibetan Multi', 'Verb Lexicon', 'Yogacharabhumi Sanskrit', 'Tsig Dzo Chenmo', 'Tsepak Rigdzin', 'Tony Duff' ])
const customQueryLoading = ref(false)
const nativeQueryLoading = ref(false)



//inject
const reloadDictionary = inject('reloadDictionary')

//emit function to parent
const emit = defineEmits(['closeModal'])


//on submit
const handleCustomSubmit = () => {
    const { mutate: createDictionary, onError, onDone, error , loading} = useMutation(ADD_DICTIONARY, {variables: { ...inputForm}})
    createDictionary()
    customQueryLoading.value = loading.value
    onDone(() => {
        customQueryLoading.value = loading.value
        const addDictionary = reloadDictionary()
        addDictionary.refetch()
        closeModal()

    })
    onError(() => {
       alert(`${error.value}`)
    })
}

const handleNativeSubmit = async () => {
    const { mutate: createDictionary, onError, onDone, loading,  error} = await useMutation(ADD_DICTIONARY_API, {variables: {dictionary: {...inputForm}}}, {refetchQueries: [GET_DICTIONARIES]})
    createDictionary()
    nativeQueryLoading.value = loading.value
    onDone(() => {
        const addDictionary = reloadDictionary()
        addDictionary.refetch()
        nativeQueryLoading.value = loading.value
        closeModal()
    })
    onError(() => {
        nativeQueryLoading.value = loading.value
       alert(`${error.value}`)
    })
}
const closeModal = () => {
    emit('closeModal')
}

</script>
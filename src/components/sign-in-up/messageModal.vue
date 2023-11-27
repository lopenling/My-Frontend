<template>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="div"
      class="relative z-10"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
  
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="$emit('closeModal')"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    class="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                  >
                    Error
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{ message.value.error_description }}
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
  
  <script setup>
  import { onMounted, ref, watch} from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  
  //props
  const props = defineProps({
    isModalOpen: Boolean,
    errorMessage: Object
  })

  //state
  const open = ref(true)
  const message = ref(null)

  //mounted
  onMounted(() => {
    open.value = props.isModalOpen
    message.value = props.errorMessage
  })

  //on state change
  watch(open, (newVal, oldVal) => {
    open.value = props.isModalOpen
    message.value = props.errorMessage
  })

  </script>
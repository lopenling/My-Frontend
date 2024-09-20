<template>
  <TransitionRoot as="template" :show="open">
    <div
      class="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center p-4 pb-12 sm:pt-6"
    >
      <TransitionChild
        as="div"
        enter="transition-opacity ease-out duration-300 "
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
        class="absolute inset-0 z-0 bg-gradient-to-b from-white/100 from-50% to-transparent transition sm:from-white/50 sm:from-10%"
      />
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0 -translate-y-2 "
        enter-to="opacity-100 translate-y-0"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 "
        leave-to="opacity-0 -translate-y-2"
      >
        <div
          class="pointer-events-auto relative z-10 min-w-full max-w-lg rounded-lg border bg-stone-100 px-4 py-4 shadow-lg+ transition bg-mix-amount-60 sm:min-w-56 sm:px-5"
          :class="[
            appearance === 'success' && 'border-secondary-500/30 bg-mix-secondary-200',
            appearance === 'error' && 'border-red-500/30 bg-mix-red-200',
          ]"
        >
          <div class="flex items-start gap-0">
            <div class="flex gap-4">
              <component
                :is="appearance === 'success' ? IconValidationCheck : IconWarningCircle"
                class="h-4 w-4 shrink-0 grow-0 transition"
                :class="[
                  appearance === 'success' && 'text-secondary-400',
                  appearance === 'error' && 'scale-[1.2] text-red-400',
                ]"
                aria-hidden="true"
                :data-stroke-width="appearance === 'success' ? 3 : 2.5"
              />
              <div class="-mt-0.5">
                <p
                  class="text-pretty text-sm font-medium leading-snug transition"
                  :class="[
                    appearance === 'success' && 'text-secondary-600',
                    appearance === 'error' && 'text-red-600',
                  ]"
                >
                  {{ message }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { ref } from 'vue'
import IconValidationCheck from '../icons/streamline/micro-line/IconValidationCheck.vue'
import IconWarningCircle from '../icons/streamline/micro-line/IconWarningCircle.vue'
import eventBus from '@/lib/eventBus'

const open = ref(false)
const appearance = ref('success')
const message = ref('')

let timeoutId: number

eventBus.on('open-alert', (event) => {
  // If no message, then don't show alert
  if (!event.message) {
    return
  }
  appearance.value = event.appearance
  message.value = event.message
  open.value = true

  autoClose(event.message, event.timeAlive)
})

eventBus.on('close-alert', () => {
  open.value = false
})

/**
 * Autoclose alert after x time. The longer the message, the longer it will stay open
 * Minimum open time is 2.5 sec
 * @param message Message to show
 * @param timeAlive Force overwrite alert visible time
 */
function autoClose(message: string, timeAlive?: number) {
  /** Minimum visible time for alert */
  const minimum_visible_time = 2500

  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  // By default, show alert longer for longer messages
  let timeoutTime = message.length * 66

  // By default, don't show alert less than minimum alert time
  if (!timeAlive || timeoutTime < minimum_visible_time) {
    timeoutTime = minimum_visible_time
  }

  // Apply force overwritten time
  if (timeAlive) {
    timeoutTime = timeAlive
  }

  // Close alert after x time
  timeoutId = setTimeout(() => {
    open.value = false
  }, timeoutTime)
}
</script>

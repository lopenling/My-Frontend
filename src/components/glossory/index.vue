<template>
    <div class="mx-auto max-w-3xl">
      <div
        class="mb-12 flex flex-row flex-wrap gap-x-6 gap-y-1 sm:mb-6 sm:justify-end"
      >
        <div class="mt-2 flex items-center text-sm text-stone-500">
          <Fragment
            v-html="IconBookEdit({
              className: 'mr-1.5 h-5 w-5 flex-shrink-0 text-stone-400',
              ariaHidden: 'true',
            })"
          />
          0/3 custom
        </div>

        <div class="mt-2 flex items-center text-sm text-stone-500">
            
          <Fragment
            v-html="IconBookClose2({
              className: 'mr-1.5 h-5 w-5 flex-shrink-0 text-stone-400',
              ariaHidden: 'true',
            })"
          />
          18/30 native
        </div>

        <div class="mt-2 flex items-center text-sm text-stone-500">
          <Fragment
            v-html="IconSingleNeutral({
              className: 'mr-1.5 h-5 w-5 flex-shrink-0 text-stone-400',
              ariaHidden: 'true',
            })"
          />
          3
        </div>
      </div>
    </div>
</template>
<script setup>
// import { 
//   GET_ORG_MEMBERS
// } from '@/components/graphql/quries.js';
import {
  IconBookClose2,
  IconBookEdit,
  IconSingleNeutral,
} from "@/scripts/icons/streamline/regular.mjs";

</script>
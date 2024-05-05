<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBoxValue">
    <defs></defs>
    <!-- <title>arrow-right</title> -->
    <path
      d="m0.75 12 22.5 0"
      fill="none"
      stroke="currentcolor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="M12.75 22.5 23.25 12 12.75 1.5"
      fill-rule="evenodd"
      fill="none"
      stroke="currentcolor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()
let viewBoxValue = '0 0 24 24'
let strokeWidth = '1.5'

if (attrs['data-expand-by']) {
  viewBoxValue = viewBoxValue
    .split(' ')
    .map((value, index) => {
      if (index < 2) {
        return parseInt(value) - Number(attrs['data-expand-by'])
      } else {
        return parseInt(value) + Number(attrs['data-expand-by']) * 2
      }
    })
    .join(' ')
}
if (attrs['data-stroke-width']) strokeWidth = attrs['data-stroke-width'].toString()
</script>

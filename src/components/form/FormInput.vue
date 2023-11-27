<script lang="ts">
  export default {
    name: 'FormInput',
    props: {
      error: {
        type: Boolean,
        required: false,
        default: false,
      },
      success: {
        type: Boolean,
        required: false,
        default: false,
      },
      label: {
        type: String,
        required: false,
        default: '',
      },
      required: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<template>
  <div
    :class="{
      error: error,
      success: success
    }"
  >
    <!-- Label -->
    <label
      v-if="label"
      :for="`input-${uuid}`"
    >
      {{ label }}
      <span v-if="required">*</span>
    </label>

    <!-- Caption under label -->
    <label
      v-if="caption"
      :for="`input-${uuid}`"
    >
      {{ caption }}
    </label>

    <!-- Input itself-->
    <input
      :id="`input-${uuid}`"
      :placeholder="placeholder"
      :value="value"
      v-bind="attrs"
      @input="input"
      v-on="listeners"
    >
    <label
      v-if="hint"
      :for="`input-${uuid}`"
    >
      {{ hint }}
    </label>
  </div>
</template>

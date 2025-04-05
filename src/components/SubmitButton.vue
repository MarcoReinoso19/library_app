<script lang="ts" setup>
import { VFadeTransition } from 'vuetify/lib/components/index.mjs'

withDefaults(
  defineProps<{
    label: string
    isPending: boolean
    block?: boolean
    minWidth?: string
    color?: string
    variant?: 'elevated' | 'flat' | 'text' | 'tonal' | 'outlined' | 'plain'
    type?: string
  }>(),
  {
    block: false,
    color: 'primary',
    variant: 'elevated',
    type: 'submit',
  }
)
</script>

<template>
  <VBtn :block="block" :type="type" :min-width="minWidth" :disabled="isPending" :color="color" :variant="variant">
    <VFadeTransition hide-on-leave leave-absolute>
      <template v-if="!isPending">
        {{ label }}
      </template>
      <template v-else>
        <VProgressCircular :size="26" width="3" color="white" indeterminate />
      </template>
    </VFadeTransition>
    <template v-if="$slots.append">
      <template v-for="(_, name) in $slots" :key="name">
        <slot :name="name" />
      </template>
    </template>
  </VBtn>
</template>

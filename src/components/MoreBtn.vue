<script lang="ts" setup>
interface Props {
  menuList?: unknown[]
  itemProps?: boolean
  iconSize?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: 'text-disabled',
})
</script>

<template>
  <VBtn icon color="default" variant="text" :class="props.class">
    <VIcon :size="iconSize" icon="mdi-dots-vertical" />

    <VMenu v-if="props.menuList" activator="parent">
      <VList :items="props.menuList" :item-props="props.itemProps" />
    </VMenu>
  </VBtn>
</template>

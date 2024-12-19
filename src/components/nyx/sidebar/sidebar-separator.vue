<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

<template>
  <NyxSeparator data-sidebar="separator" :class="cn('mx-2 w-auto bg-sidebar-border', props.class)">
    <slot />
  </NyxSeparator>
</template>

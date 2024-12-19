<template>
  <table :class="cn('w-full', props.class)">
    <slot />
  </table>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

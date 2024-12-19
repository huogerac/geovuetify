<template>
  <tbody :class="cn(props.class)">
    <slot />
  </tbody>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

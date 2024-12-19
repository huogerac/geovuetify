<template>
  <p :class="cn('text-xl text-muted-foreground', props.class)">
    <slot />
  </p>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

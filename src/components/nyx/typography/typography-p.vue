<template>
  <p :class="cn('leading-7 [&:not(:first-child)]:mt-6', props.class)">
    <slot />
  </p>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

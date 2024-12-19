<template>
  <blockquote :class="cn('mt-6 border-l-2 pl-6 italic', props.class)">
    <slot />
  </blockquote>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

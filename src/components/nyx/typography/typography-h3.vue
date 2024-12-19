<template>
  <h3 :class="cn('scroll-m-20 text-2xl font-semibold tracking-tight', props.class)">
    <slot />
  </h3>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

<template>
  <div :class="cn('text-lg font-semibold', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

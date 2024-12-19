<template>
  <small :class="cn('text-sm font-medium leading-none', props.class)"> Email address </small>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

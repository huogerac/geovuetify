<template>
  <tr :class="cn('m-0 border-t p-0', props.class)">
    <slot />
  </tr>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

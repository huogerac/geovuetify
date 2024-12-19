<template>
  <div :class="cn('my-6 w-full overflow-y-auto', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

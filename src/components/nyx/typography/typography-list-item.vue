<template>
  <li :class="cn(props.class)">
    <slot />
  </li>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

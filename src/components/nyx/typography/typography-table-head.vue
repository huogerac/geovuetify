<template>
  <thead :class="cn(props.class)">
    <tr class="m-0 border-t p-0 even:bg-muted">
      <th
        class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
        King's Treasury
      </th>
      <th
        class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
        People's happiness
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

<template>
  <tbody :class="cn(props.class)">
    <tr class="m-0 border-t p-0 even:bg-muted">
      <td
        class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        Empty
      </td>
      <td
        class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        Overflowing
      </td>
    </tr>
    <tr class="m-0 border-t p-0 even:bg-muted">
      <td
        class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        Modest
      </td>
      <td
        class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        Satisfied
      </td>
    </tr>
    <tr class="m-0 border-t p-0 even:bg-muted">
      <td
        class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        Full
      </td>
      <td
        class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        Ecstatic
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"

  const props = defineProps<{
    class?: HTMLAttributes["class"]
  }>()
</script>

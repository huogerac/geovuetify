<script setup lang="ts">
  import type { ButtonProps } from "."
  import { buttonVariants } from "."

  const props = withDefaults(defineProps<ButtonProps>(), {
    as: "button",
  })
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </Primitive>
</template>

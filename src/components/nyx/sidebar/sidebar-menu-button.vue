<script setup lang="ts">
  import { type Component, computed } from "vue"
  import SidebarMenuButtonChild, {
    type SidebarMenuButtonProps,
  } from "./sidebar-menu-button-child.vue"
  import { useSidebar } from "./utils"

  defineOptions({
    inheritAttrs: false,
  })

  const props = withDefaults(
    defineProps<
      SidebarMenuButtonProps & {
        tooltip?: string | Component
      }
    >(),
    {
      as: "button",
      variant: "default",
      size: "default",
    },
  )

  const { isMobile, state } = useSidebar()

  const delegatedProps = computed(() => {
    const { tooltip, ...delegated } = props
    return delegated
  })
</script>

<template>
  <SidebarMenuButtonChild v-if="!tooltip" v-bind="{ ...delegatedProps, ...$attrs }">
    <slot />
  </SidebarMenuButtonChild>

  <NyxTooltip v-else>
    <NyxTooltipTrigger as-child>
      <SidebarMenuButtonChild v-bind="{ ...delegatedProps, ...$attrs }">
        <slot />
      </SidebarMenuButtonChild>
    </NyxTooltipTrigger>
    <NyxTooltipContent side="right" align="center" :hidden="state !== 'collapsed' || isMobile">
      <template v-if="typeof tooltip === 'string'">
        {{ tooltip }}
      </template>
      <component :is="tooltip" v-else />
    </NyxTooltipContent>
  </NyxTooltip>
</template>

<template>
  <NyxSidebarProvider :default-open="false">
    <NyxSidebar collapsible="icon">
      <NyxSidebarHeader>
        <NyxSidebarMenu>
          <NyxSidebarMenuItem>
            <NyxSidebarMenuButton as-child size="lg" tooltip="Go to home">
              <NuxtLink href="/">
                <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Earth class="size-5" />
                </div>
              </NuxtLink>
            </NyxSidebarMenuButton>
          </NyxSidebarMenuItem>
        </NyxSidebarMenu>
      </NyxSidebarHeader>

      <NyxSidebarContent />

      <NyxSidebarFooter>
        <NyxSidebarMenu>
          <NyxSidebarMenuItem>
            <NyxSidebarMenuButton size="lg" tooltip="Toggle theme" @click="isDark = !isDark">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                <Moon v-if="isDark" class="size-5" />
                <Sun v-else class="size-5" />
              </div>
            </NyxSidebarMenuButton>
          </NyxSidebarMenuItem>
        </NyxSidebarMenu>
      </NyxSidebarFooter>
    </NyxSidebar>

    <NyxSidebarInset>
      <div class="flex-1">
        <slot />
      </div>
    </NyxSidebarInset>
  </NyxSidebarProvider>
</template>

<script setup lang="ts">
  import { Earth, Moon, Sun } from "lucide-vue-next"

  const colorMode = useColorMode()
  const isDark = computed({
    get() {
      return colorMode.value === "dark"
    },
    set() {
      colorMode.preference = isDark.value ? "light" : "dark"
    },
  })
</script>

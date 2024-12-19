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
                  <Globe class="size-4" />
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
                <Moon v-if="isDark" class="size-4" />
                <Sun v-else class="size-4" />
              </div>
            </NyxSidebarMenuButton>
          </NyxSidebarMenuItem>
        </NyxSidebarMenu>
      </NyxSidebarFooter>
    </NyxSidebar>

    <NyxSidebarInset>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </div>
    </NyxSidebarInset>
  </NyxSidebarProvider>
</template>

<script setup lang="ts">
  import { Globe, Sun, Moon } from "lucide-vue-next"

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

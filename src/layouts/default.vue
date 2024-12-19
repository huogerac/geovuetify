<template>
  <NyxSidebarProvider :default-open="false">
    <NyxSidebar collapsible="icon">
      <NyxSidebarHeader>
        <NyxSidebarMenu>
          <NyxSidebarMenuItem>
            <NyxSidebarMenuButton size="lg" tooltip="Go back" as-child>
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
    </NyxSidebar>

    <NyxSidebarInset>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </div>
    </NyxSidebarInset>
  </NyxSidebarProvider>
</template>

<script setup lang="ts">
  import { Globe } from "lucide-vue-next"
</script>

<template>
  <NyxSidebarProvider :default-open="false">
    <NyxSidebar collapsible="icon">
      <NyxSidebarHeader>
        <NyxSidebarMenu>
          <NyxSidebarMenuItem>
            <NyxSidebarMenuButton size="lg">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Globe class="size-4" />
              </div>

              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">opendata4nature</span>
                <span>Building a better world!</span>
              </div>
            </NyxSidebarMenuButton>
          </NyxSidebarMenuItem>
        </NyxSidebarMenu>
      </NyxSidebarHeader>
    </NyxSidebar>

    <NyxSidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <NyxSidebarTrigger class="-ml-1" />
          <!-- <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#"> Building Your Application </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> -->
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </NyxSidebarInset>
  </NyxSidebarProvider>
</template>

<script setup lang="ts">
  import { Globe } from "lucide-vue-next"
</script>

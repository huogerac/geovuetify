<template>
  <div>
    <NyxStepper>
      <NyxStepperItem v-for="step in steps" :key="step.id" :step="step.id">
        <NyxStepperTrigger>
          <NyxStepperIndicator>
            <component :is="step.icon" class="size-4" />
          </NyxStepperIndicator>

          <div class="flex flex-col">
            <NyxStepperTitle>
              {{ step.title }}
            </NyxStepperTitle>

            <NyxStepperDescription>
              {{ step.description }}
            </NyxStepperDescription>
          </div>
        </NyxStepperTrigger>

        <NyxStepperSeparator v-if="step.id !== steps[steps.length - 1].id" class="h-px w-full" />
      </NyxStepperItem>
    </NyxStepper>
  </div>
</template>

<script setup lang="ts">
  import { FileUp, HardDriveDownload, Sheet } from "lucide-vue-next"

  const steps = [
    {
      id: 1,
      title: "Template",
      description: "Download and fill the spreadsheet",
      icon: Sheet,
    },
    {
      id: 2,
      title: "Points",
      description: "Upload the filled spreadsheet ",
      icon: FileUp,
    },
    {
      id: 3,
      title: "Results",
      description: "Download your report results",
      icon: HardDriveDownload,
    },
  ]
</script>

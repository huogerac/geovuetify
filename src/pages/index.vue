<template>
  <div class="grid h-full grid-cols-[38rem,1fr]">
    <aside class="border-r">
      <NyxStepper class="border-b px-6 py-4">
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

      <div class="px-6 py-8">
        <div>
          <NyxTypographyH2>Template</NyxTypographyH2>
          <NyxTypographyLead>
            Download and fill the geolocations template spreadsheet
          </NyxTypographyLead>
        </div>

        <div class="pt-8">
          <NyxTypographyP>
            In this step, you will need to download and fill the geolocations template spreadsheet.
          </NyxTypographyP>

          <NyxTypographyP>
            Inside this template spreadsheet you will find the following fields:
          </NyxTypographyP>

          <NyxTypographyTableContainer>
            <NyxTypographyTable class="table-fixed">
              <NyxTypographyTableThead>
                <NyxTypographyTableRow>
                  <NyxTypographyTableHead>Field name</NyxTypographyTableHead>
                  <NyxTypographyTableHead>Field description</NyxTypographyTableHead>
                </NyxTypographyTableRow>
              </NyxTypographyTableThead>

              <NyxTypographyTableTbody>
                <NyxTypographyTableRow>
                  <NyxTypographyTableData>Company</NyxTypographyTableData>
                  <NyxTypographyTableData>Enter the company name</NyxTypographyTableData>
                </NyxTypographyTableRow>

                <NyxTypographyTableRow>
                  <NyxTypographyTableData>Site</NyxTypographyTableData>
                  <NyxTypographyTableData>Enter the site name</NyxTypographyTableData>
                </NyxTypographyTableRow>

                <NyxTypographyTableRow>
                  <NyxTypographyTableData>ISIC</NyxTypographyTableData>
                  <NyxTypographyTableData>
                    Enter the ISIC Group Code, you can find it on the spreadsheet
                  </NyxTypographyTableData>
                </NyxTypographyTableRow>

                <NyxTypographyTableRow>
                  <NyxTypographyTableData>Latitude</NyxTypographyTableData>
                  <NyxTypographyTableData>
                    Enter the latitude of the site (in WGS84 decimal degrees)
                  </NyxTypographyTableData>
                </NyxTypographyTableRow>

                <NyxTypographyTableRow>
                  <NyxTypographyTableData>Longitude</NyxTypographyTableData>
                  <NyxTypographyTableData>
                    Enter the longitude of the site (in WGS84 decimal degrees).
                  </NyxTypographyTableData>
                </NyxTypographyTableRow>
              </NyxTypographyTableTbody>
            </NyxTypographyTable>
          </NyxTypographyTableContainer>

          <div class="mx-auto max-w-36">
            <NyxButton class="w-full">
              <span>Download</span>
              <ArrowDownToLine class="size-4" />
            </NyxButton>
          </div>
        </div>
      </div>
    </aside>

    <section>abc</section>
  </div>
</template>

<script setup lang="ts">
  import { ArrowDownToLine, FileUp, HardDriveDownload, Sheet } from "lucide-vue-next"

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

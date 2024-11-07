<template>
  <VCard style="padding-top: 20px">
    <h2>Step 1</h2>
    <v-btn
      :href="templateSampleUrl"
      prepend-icon="mdi-file-excel-outline"
      variant="tonal"
      block
      class="mt-2"
      >Get XLS points template</v-btn
    >
  </VCard>
</template>

<script>
export default {
  data: () => ({
    templateSampleUrl:
      'https://opendata4nature-org-bucket-public.s3.sa-east-1.amazonaws.com/downloads/site_locations_template.xlsx'
  })
}
</script>

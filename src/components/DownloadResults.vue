<template>
  <VCard style="padding-top: 20px">
    <h2>Step 3</h2>
    <v-btn
      :href="templateSampleUrl"
      prepend-icon="mdi-file-excel-outline"
      variant="tonal"
      block
      class="mt-2"
      >Download Results</v-btn
    >
  </VCard>
</template>

<script>
export default {
  data: () => ({
    templateSampleUrl: '#'
  })
}
</script>

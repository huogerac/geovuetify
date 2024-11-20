<template>
  <VCard style="padding-top: 20px">
    <h2 class="ml-3">Step 3</h2>
    <v-btn v-if="!resultsUrl" @click="processReport">Generate SBTN Report</v-btn>
    <v-btn
      :href="resultsUrl"
      v-if="resultsUrl"
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
  }),
  props: {
    resultsUrl: {
      type: String,
      default: ''
    }
  },
  emits: ['processReport'],
  methods: {
    processReport() {
      this.$emit('processReport')
    }
  }
}
</script>

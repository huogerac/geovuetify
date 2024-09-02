<template>
  <VCard style="padding-top: 20px;">
    <form 
      id="upload-form"
      class="dropzone glass-box ma-2"
      action="http://localhost:8000/api/core/upload"
    >
      <v-file-input label="File input" variant="outlined" style="margin-right: 20px" v-model="filePoints" :loading="loading"</v-file-input>
      <v-btn v-if="!downloadUrl" prepend-icon="mdi-open-in-new" variant="outlined" size="x-large" block :loading="loading" @click="send" >Upload points</v-btn>
      <v-btn v-else :href="downloadUrl" prepend-icon="mdi-file-excel-outline" variant="outlined" block >DOWNLOAD RESULTS</v-btn>
      <v-btn  :href="templateSampleUrl" prepend-icon="mdi-file-excel-outline" variant="tonal" block class="mt-2">Get XLS template</v-btn>
    </form>
  </VCard>
</template>

<script>
export default {
  props: {
    downloadUrl: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    filePoints: null,
    templateSampleUrl: 'https://opendata4nature-org-bucket-public.s3.sa-east-1.amazonaws.com/downloads/site_locations_template.xlsx'
  }),
  emits: ['sendPositions'],
  methods: {
    send() {
      console.log('click')
      this.$emit('sendPositions', this.filePoints)
    }
  }
}
</script>

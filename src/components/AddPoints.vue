<template>
  <VCard style="padding-top: 20px;">
    <h2 class="ml-3">Step 2</h2>
    <form 
      id="upload-form"
      class="dropzone glass-box ma-2"
      :action="`${apiBaseUrl}/api/core/upload`"
    >
      <v-file-input label="File input" variant="outlined" style="margin-right: 20px" v-model="excelUploadedFile" :loading="loading"</v-file-input>
      <v-btn prepend-icon="mdi-open-in-new" variant="outlined" size="x-large" block :loading="loading" @click="send" :disabled="!excelUploadedFile" >Add points from file</v-btn>
    </form>
  </VCard>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    excelUploadedFile: null,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL
  }),
  emits: ['uploadFile'],
  methods: {
    send() {
      console.log('click')
      this.$emit('uploadFile', this.excelUploadedFile)
    }
  }
}
</script>

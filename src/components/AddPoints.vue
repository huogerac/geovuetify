<template>
  <VCard style="padding-top: 20px;">
    <h2>Step 2</h2>
    <form 
      id="upload-form"
      class="dropzone glass-box ma-2"
      action="http://localhost:8000/api/core/upload"
    >
      <v-file-input label="File input" variant="outlined" style="margin-right: 20px" v-model="excelUploadedFile" :loading="loading"</v-file-input>
      <v-btn prepend-icon="mdi-open-in-new" variant="outlined" size="x-large" block :loading="loading" @click="send" >Add points from file</v-btn>
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

<template>
  <VCard style="padding-top: 20px">
    <form
      id="upload-form"
      class="dropzone glass-box"
      action="http://localhost:8000/api/core/upload"
    >
      <v-file-input label="File input" variant="outlined" style="margin-right: 20px" v-model="filePoints"</v-file-input>
      <v-btn v-if="!downloadUrl" prepend-icon="mdi-open-in-new" variant="text" block @click="send" >Upload points</v-btn>
      <v-btn v-else :href="downloadUrl" prepend-icon="mdi-file-excel-outline" variant="tonal" block >DOWNLOAD RESULTS</v-btn>
    </form>
  </VCard>
</template>

<script>
export default {
  props: {
    downloadUrl: {
      type: String,
      default: null
    }
  },
  data: () => ({
    filePoints: null
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

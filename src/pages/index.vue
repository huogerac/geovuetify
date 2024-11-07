<template>
  <v-main class="fill-height">
    <LMap
      ref="map"
      :use-global-leaflet="false"
      :zoom="3"
      :center="[-14.235, -51.9253]"
      :options="{
        minZoom: 3,
        maxZoom: 20,
        zoomControl: false,
        attributionControl: false
      }"
    >
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <!-- show the execution saved points-->
      <PMarker
        v-if="myPoints"
        v-for="myPoint in myPoints"
        :latLng="[myPoint.properties.latitude, myPoint.properties.longitude]"
        :data="myPoint.properties"
      />

      <!-- Step 1. Download Template -->
      <PControl :is-responsive="true" position="topleft" style="max-width: 380px">
        <DownloadTemplate />
      </PControl>

      <!-- Step 2. Add points-->
      <PControl :is-responsive="true" position="topleft" style="max-width: 380px">
        <AddPoints v-model="downloadFile" :loading="loading" @uploadFile="uploadPoints" />
      </PControl>

      <!-- Step 3. get report-->
      <PControl :is-responsive="true" position="topleft" style="max-width: 380px">
        <DownloadResults />
      </PControl>
    </LMap>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

import ExecutionApi from '@/api/executions.api'

const loading = ref(false)
const map = ref(null)
const location = ref()

const currentExecutionId = ref(null)
const myPoints = ref([])

const downloadFile = ref(null)

onMounted(async () => {
  loading.value = true
  currentExecutionId.value = localStorage.getItem('executionId')
  console.log('currentExecutionId.value', currentExecutionId.value)
  if (!currentExecutionId.value) {
    console.log('Criando executionId')
    const newExecution = await ExecutionApi.addExecution('email@example.com')
    localStorage.setItem('executionId', newExecution.id)
    currentExecutionId.value = newExecution.id
    console.log('currentExecutionId.value [NEW]', currentExecutionId.value)
  }

  const pointsData = await ExecutionApi.getExecutionPoints(currentExecutionId.value)
  myPoints.value = pointsData.points
  loading.value = false
})

// step 1 - add points
const uploadPoints = async (uploadedPointsFile) => {
  loading.value = true
  const response = await ExecutionApi.uploadPoints(currentExecutionId.value, uploadedPointsFile)
  console.log('response', response)
  const pointsData = await ExecutionApi.getExecutionPoints(currentExecutionId.value)
  myPoints.value = pointsData.points
  loading.value = false
}
</script>

<style>
.leaflet-layer,
.leaflet-control-zoom-in,
.leaflet-control-zoom-out,
.leaflet-control-attribution {
  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
}
</style>

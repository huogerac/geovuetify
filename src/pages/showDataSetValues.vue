<template>
  <v-main class="fill-height">
    <LMap
      ref="map"
      :use-global-leaflet="false"
      :zoom="3"
      :center="[-14.235, -51.9253]"
      :options="{
        minZoom: 4,
        maxZoom: 16,
        zoomControl: false,
        attributionControl: false
      }"
    >
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <!-- location-->
      <LMarker v-if="location" :latLng="location" />

      <!-- '1 Water Use' -->
      <PGeometry
        v-if="layersdata[layers[WATER_AVAILABILITY].index] && layer_selected == WATER_AVAILABILITY"
        :dataName="WATER_AVAILABILITY"
        :geometry="layersdata[layers[WATER_AVAILABILITY].index]"
        :color="layers[WATER_AVAILABILITY].colorHover"
        :colors="layers[WATER_AVAILABILITY].colorsScale"
        @click-feature="showFeatureValues"
      />

      <!-- '2 Water Pollution' -->
      <PGeometry
        v-if="layersdata[layers[WATER_POLLUTION].index] && layer_selected == WATER_POLLUTION"
        :dataName="WATER_POLLUTION"
        :geometry="layersdata[layers[WATER_POLLUTION].index]"
        :color="layers[WATER_POLLUTION].colorHover"
        :colors="layers[WATER_POLLUTION].colorsScale"
        @click-feature="showFeatureValues"
      />

      <!--
      <PGeometry
        v-if="pointsdata && pointsdata.length > 0"
        dataName="WATER_AVAILABILITY"
        geometry="pointsdata"
        color="layers[WATER_AVAILABILITY].colorHover"
        colors="layers[WATER_AVAILABILITY].colorsScale"
        @click-feature="showFeatureValues"
      /> -->

      <PMarker
        v-if="myPoints"
        v-for="myPoint in myPoints"
        :latLng="[myPoint.properties.latitude, myPoint.properties.longitude]"
        :data="myPoint.properties"
        @click-point="showPointsValues"
      />

      <!-- lat lon 
      <PControl :is-responsive="true" position="topleft" style="max-width: 240px">
        <PSearchbar @sendPosition="setPosition" />
      </PControl> -->

      <PControl :is-responsive="true" position="topleft" style="max-width: 380px">
        <PSendPoints
          v-model="downloadFile"
          :loading="loading"
          :downloadUrl="downloadUrl"
          @sendPositions="uploadPoints"
        />
      </PControl>

      <PControl :is-responsive="false" position="topright" style="min-width: 240px">
        <VCard>
          <v-combobox
            chips
            label="Data Layer"
            v-model="layer_selected"
            :items="[WATER_AVAILABILITY, WATER_POLLUTION]"
          ></v-combobox>
        </VCard>
      </PControl>

      <!-- show data featureValues  -->
      <PControl :is-responsive="true" position="bottomleft">
        <div v-if="featureValues?.values">
          <VCard v-for="(dataValues, key) in featureValues.values" :key="key">
            <h2 v-if="key == layer_selected">{{ key }}</h2>
            <h3 v-else>{{ key }}</h3>
            <v-table>
              <tbody>
                <template v-for="(dvValue, dvKey) in dataValues" :key="dvKey">
                  <tr v-if="dvKey == key">
                    <td class="text-grey-lighten-1">{{ dvKey }}: {{ dvValue }}</td>
                    <td>
                      <PColorPalette :colors="layers[key]?.colors" :value="parseFloat(dvValue)" />
                    </td>
                  </tr>
                  <tr v-else>
                    <td class="text-grey-lighten-1">{{ dvKey }}: {{ dvValue }}</td>
                    <td></td>
                  </tr>
                </template>
              </tbody>
            </v-table>
          </VCard>
        </div>
      </PControl>
    </LMap>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

import SonApi from '@/api/son.api'
import PSendPoints from '@/components/PSendPoints.vue'

const WATER_AVAILABILITY = 'Water Use'
const WATER_POLLUTION = 'Water Pollution'
// const BIO_INTACTNESS = 'Biodiversity Intactness'
// const ECO_INTEGRITY = 'Ecosystem Integrity'
// const DEFORESTATION = 'Deforestation'
// const SOIL_POLLUTION = 'Soil Pollution'

const loading = ref(false)

const layers = ref(null)
layers.value = {
  'Water Use': {
    index: 1,
    colorHover: '#0a006e',
    colorsScale: [
      { value: 0.05, color: '#c6c1ff' },
      { value: 0.1, color: '#a49cf8' },
      { value: 0.2, color: '#8276f8' },
      { value: 0.3, color: '#5f50fb' },
      { value: 0.5, color: '#2f1cef' },
      { value: 0.7, color: '#1a06e4' },
      { value: 0.9, color: '#1100be' },
      { value: 1.0, color: '#0e0287' }
    ],
    colors: [
      { value: 0.0, color: '#a49cf8' },
      { value: 0.2, color: '#8276f8' },
      { value: 0.4, color: '#5f50fb' },
      { value: 0.6, color: '#2f1cef' },
      { value: 0.8, color: '#1100be' },
      { value: 1.0, color: '#0e0287' }
    ]
  },
  'Water Pollution': {
    index: 2,
    colorHover: '#632003',
    colorsScale: [
      { value: 0.05, color: '#f3d6b8' },
      { value: 0.1, color: '#fdd0a2' },
      { value: 0.2, color: '#fdae6b' },
      { value: 0.3, color: '#fd8d3c' },
      { value: 0.5, color: '#f16913' },
      { value: 0.7, color: '#d94801' },
      { value: 0.9, color: '#a43302' },
      { value: 1.0, color: '#752401' }
    ],
    colors: [
      { value: 0.0, color: '#f3d6b8' },
      { value: 0.2, color: '#fdd0a2' },
      { value: 0.4, color: '#fdae6b' },
      { value: 0.6, color: '#fd8d3c' },
      { value: 0.8, color: '#a43302' },
      { value: 1.0, color: '#752401' }
    ]
  }
}

const layer_selected = ref(WATER_AVAILABILITY)
const layersdata = ref({})
const map = ref(null)
const location = ref()
const featureValues = ref({})

const pointsdata = ref([])
const downloadFile = ref(null)
const downloadUrl = ref(null)

const myPoints = ref([])

const uploadPoints = async (newFile) => {
  loading.value = true
  const pointsData = await SonApi.uploadPoints(newFile)
  myPoints.value = pointsData.features
  downloadUrl.value = pointsData.output_path

  let newLocation = [
    pointsData.features[pointsData.features.length - 1].properties.latitude,
    pointsData.features[pointsData.features.length - 1].properties.longitude
  ]

  flyTo(newLocation)
  loading.value = false
}

const setPosition = async (newLocation) => {
  console.log('received newLocation:', newLocation)
  setPosition.value = newLocation

  location.value = newLocation
  let [latitude, longitude] = newLocation

  const _840km = 840000
  getLayers(latitude, longitude, _840km)

  flyTo(newLocation)
}

const showFeatureValues = async (geometry) => {
  featureValues.value = geometry.feature.properties
}

const showPointsValues = async (data, event) => {
  featureValues.value = data
}

const getLayers = async (latitude, longitude, distanceInMeters) => {
  const featureData = await SonApi.getDataSetValues(
    'son_water:2020Jul',
    latitude,
    longitude,
    distanceInMeters
  )

  for (let [key, value] of Object.entries(featureData.features[0].properties.values)) {
    const indexLayer = layers.value[key].index
    console.log('--> layers - key:', key, ' index:', indexLayer)
    layersdata.value[indexLayer] = featureData.features
  }
}

const flyTo = (coordinates) => map.value.leafletObject.flyTo(coordinates, 5)
</script>

<style>
.leaflet-layer,
.leaflet-control-zoom-in,
.leaflet-control-zoom-out,
.leaflet-control-attribution {
  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
}
</style>

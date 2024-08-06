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

      <!-- '1 Water Availability' -->
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

      <!--'5 Deforestation' 
      <PGeometry
        v-if="layersdata[layers[DEFORESTATION].index] && layer_selected == DEFORESTATION"
        :geometry="layersdata[layers[DEFORESTATION].index]"
        :color="layers[DEFORESTATION].color"
        @click-feature="showFeatureValues"
      /> -->

      <!-- lat lon -->
      <PControl :is-responsive="true" position="topleft" style="max-width: 240px">
        <PSearchbar @sendPosition="setPosition" />
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

      <!-- show data -->
      <PControl :is-responsive="true" position="bottomleft">
        <VCard v-if="featureValues?.dataset_level_id">
          <v-table>
            <tbody>
              <tr>
                <td>#</td>
                <td>{{ featureValues.dataset_level_id }}</td>
              </tr>
              <tr v-for="(value, key) in featureValues.values" :key="key">
                <td v-if="key == layer_selected">
                  <strong>{{ key }}</strong>
                </td>
                <td v-else class="text-grey-lighten-1">
                  {{ key }}
                </td>
                <td v-if="key == layer_selected">
                  <strong>{{ value }}</strong>
                </td>
                <td v-else class="text-grey-lighten-1">
                  {{ value }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </VCard>
      </PControl>
    </LMap>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

import SonApi from '@/api/son.api'

const WATER_AVAILABILITY = 'Water Availability'
const WATER_POLLUTION = 'Water Pollution'
// const BIO_INTACTNESS = 'Biodiversity Intactness'
// const ECO_INTEGRITY = 'Ecosystem Integrity'
const DEFORESTATION = 'Deforestation'
// const SOIL_POLLUTION = 'Soil Pollution'

const layers = ref(null)
layers.value = {
  'Water Availability': {
    index: 1,
    colorHover: '#0a006e',
    colorsScale: [
      { value: 1.5, color: '#c6c1ff' },
      { value: 2.0, color: '#a49cf8' },
      { value: 2.5, color: '#8276f8' },
      { value: 3.0, color: '#5f50fb' },
      { value: 3.5, color: '#2f1cef' },
      { value: 4.0, color: '#1a06e4' },
      { value: 4.5, color: '#1100be' },
      { value: 5.0, color: '#0e0287' }
    ]
  },
  'Water Pollution': {
    index: 2,
    colorHover: '#632003',
    colorsScale: [
      { value: 1.5, color: '#f3d6b8' },
      { value: 2.0, color: '#fdd0a2' },
      { value: 2.5, color: '#fdae6b' },
      { value: 3.0, color: '#fd8d3c' },
      { value: 3.5, color: '#f16913' },
      { value: 4.0, color: '#d94801' },
      { value: 4.5, color: '#a43302' },
      { value: 5.0, color: '#752401' }
    ]
  },
  'Biodiversity Intactness': {
    index: 3,
    color: '#007aff'
  },
  'Ecosystem Integrity': {
    index: 4,
    color: '#7B1FA2'
  },
  Deforestation: {
    index: 5,
    color: '#1db43a'
  },
  'Soil Pollution': {
    index: 6,
    color: '#94671c'
  }
}
const layer_selected = ref(WATER_AVAILABILITY)

const layersdata = ref({})

const map = ref(null)
const location = ref()
//const geojsondata = ref(null)
const featureValues = ref({})

// function getCurrentLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       location.value = [position.coords.latitude, position.coords.longitude]
//       console.log('location 2:', location)
//     })
//   }
// }

const setPosition = async (newLocation) => {
  console.log('received newLocation:', newLocation)
  setPosition.value = newLocation

  location.value = newLocation
  let [latitude, longitude] = newLocation

  //const response = await SonApi.getSonData(latitude, longitude)
  // geojsondata.value = {
  //   type: 'Feature',
  //   latitude: response.result.latitude,
  //   longitude: response.result.longitude,
  //   water_data: {
  //     water_dataset_id: response.result.HYBAS_ID_lv6,
  //     water_availability: response.result.water_avai,
  //     water_pollution: response.result.water_poll
  //   },
  //   geometry: response.result.water_geometry
  // }

  flyTo(newLocation)
  const _840km = 840000
  getLayers(latitude, longitude, _840km)
}

const showFeatureValues = async (geometry) => {
  featureValues.value = geometry.feature.properties
}

const getLayers = async (latitude, longitude, distanceInMeters) => {
  // const bioData = await SonApi.getDataSetValues(
  //   'son_bio:2024Jan',
  //   latitude,
  //   longitude,
  //   distanceInMeters
  // )

  // for (let [key, value] of Object.entries(bioData.features[0].properties.values)) {
  //   const indexLayer = layers.value[key].index
  //   layersdata.value[indexLayer] = bioData.features
  // }

  const featureData = await SonApi.getDataSetValues(
    'son_water:2020Jul',
    latitude,
    longitude,
    distanceInMeters
  )

  for (let [key, value] of Object.entries(featureData.features[0].properties.values)) {
    const indexLayer = layers.value[key].index
    layersdata.value[indexLayer] = featureData.features
  }
}

const flyTo = (coordinates) => map.value.leafletObject.flyTo(coordinates, 13)

onMounted(() => {
  console.log('oi: ', location.value)
})
</script>

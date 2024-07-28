<template>
  <v-container class="fill-height">
    <LMap
      ref="map"
      v-if="location"
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

      <!-- geometry -->
      <PGeometry v-if="geojsondata" :geometry="geojsondata" @click-feature="showData" />

      <!-- lat lon -->
      <PControl :is-responsive="true" position="topleft">
        <PSearchbar @sendPosition="setPosition" />
      </PControl>

      <!-- show data -->
      <PControl :is-responsive="true" position="bottomleft">
        <VCard v-if="waterdata?.water_availability">
          <VCardTitle class="font-weight-bold text-center">State of Nature: Water</VCardTitle>
          <v-table>
            <tbody>
              <tr>
                <td>HYBAS_ID_lv6</td>
                <td>{{ waterdata.water_dataset_id }}</td>
              </tr>
              <tr>
                <td>Availability</td>
                <td>{{ waterdata.water_availability }}</td>
              </tr>
              <tr>
                <td>Pollution</td>
                <td>{{ waterdata.water_pollution }}</td>
              </tr>
            </tbody>
          </v-table>
        </VCard>
      </PControl>
    </LMap>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

//import { PControl, PSearchbar } from '@/componentes'
import SonApi from '@/api/son.api'

const map = ref(null)
const location = ref()
const geojsondata = ref(null)
const waterdata = ref({})
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

  const response = await SonApi.getSonData(latitude, longitude)
  //geojsondata = [response.result.water_geometry]

  geojsondata.value = {
    type: 'Feature',
    latitude: response.result.latitude,
    longitude: response.result.longitude,
    water_data: {
      water_dataset_id: response.result.HYBAS_ID_lv6,
      water_availability: response.result.water_avai,
      water_pollution: response.result.water_poll
    },
    geometry: response.result.water_geometry
  }
  console.log('-->geojsondata:', geojsondata)
  flyTo(newLocation)
}

const showData = async (geometry) => {
  console.log('geometry.feature.water_data:', geometry.feature.water_data)
  waterdata.value = geometry.feature.water_data
}

const flyTo = (coordinates) => map.value.leafletObject.flyTo(coordinates, 13)

onMounted(() => {
  //getCurrentLocation()
  location.value = [-14.235, -51.9253]
  console.log('oi: ', location.value)
})
</script>

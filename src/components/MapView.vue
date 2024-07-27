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

      <!-- geometry -->
      <PGeometry v-if="geojsondata" :geometry="geojsondata" />

      <!-- lat lon -->
      <PControl :is-responsive="true" position="topleft">
        <PSearchbar @sendPosition="setPosition" />
      </PControl>
    </LMap>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
//import { PControl, PSearchbar } from '@/componentes'
import SonApi from '@/api/son.api'

const map = ref(null)
const location = ref()
const geojsondata = ref(null)

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
  flyTo(newLocation)

  let [latitude, longitude] = newLocation
  const response = await SonApi.getSonData(latitude, longitude)
  //geojsondata = [response.result.water_geometry]

  geojsondata.value = {
    type: 'Feature',
    properties: {
      name: 'Coors Field',
      amenity: 'Baseball Stadium',
      popupContent: 'This is where the Rockies play!'
    },
    geometry: response.result.water_geometry
  }
  console.log('-->geojsondata:', geojsondata)
}

const flyTo = (coordinates) => map.value.leafletObject.flyTo(coordinates, 13)

onMounted(() => {
  //getCurrentLocation()
  location.value = [-14.235, -51.9253]
  console.log('oi: ', location.value)
})
</script>

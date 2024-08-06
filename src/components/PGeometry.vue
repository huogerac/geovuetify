<template>
  <LGeoJson
    ref="component"
    :geojson="$props.geometry"
    :options="{
      onEachFeature
    }"
  />
</template>

<!--
:options-style="style"
-->
<script setup>
// TODO: COLORS --> CHOROPLETH --> https://leafletjs.com/examples/choropleth/
import { ref } from 'vue'
import { LGeoJson } from '@vue-leaflet/vue-leaflet'

const component = ref(null)

const $props = defineProps({
  geometry: {
    type: Object,
    required: true
  },
  dataName: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  colors: {
    type: Array,
    required: true
  }
})

const $emit = defineEmits(['clickFeature'])

// '#7B1FA2'
// const style = () => ({
//   fillColor: $props.color,
//   weight: 3,
//   color: 'white',
//   dashArray: '4',
//   fillOpacity: 0.7
// })

const getDataValue = (feature) => {
  const dataValue = feature.properties.values[$props.dataName]
  return dataValue
}

const getFeatureStyle = (dataValue) => {
  for (const item of $props.colors) {
    const { value, color } = item
    if (dataValue <= value) {
      return {
        fillColor: color,
        weight: 1,
        color: 'white',
        dashArray: '4',
        fillOpacity: 0.7
      }
      break
    }
  }
}

const onEachFeature = (feature, layer) => {
  const dataValue = getDataValue(feature)
  layer.setStyle(getFeatureStyle(dataValue))

  layer.on({
    mouseover: ({ target }) => {
      target.setStyle({
        weight: 2,
        dashArray: '',
        fillColor: $props.color
      })
    },
    mouseout: ({ target }) => {
      //component.value.leafletObject.resetStyle(target)
      const dataValue = getDataValue(target.feature)
      const style = getFeatureStyle(dataValue)
      target.setStyle(style)
    },
    click: ({ target }) => {
      $emit('clickFeature', target)
    }
  })
}
</script>

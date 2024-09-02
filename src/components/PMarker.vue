<template>
  <LCircleMarker ref="component" :latLng="$props.latLng" @click="sendClick" />
</template>

<script setup>
import { ref } from 'vue'
import { LCircleMarker } from '@vue-leaflet/vue-leaflet'

const component = ref(null)

const $props = defineProps({
  latLng: {
    type: Array,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

const $emit = defineEmits(['clickPoint'])

const sendClick = (event) => {
  console.log('event:', event)
  console.log('data:', $props.data)
  $emit('clickPoint', $props.data, event)
}
</script>

<template>
  <div ref="map" />
</template>

<script setup lang="ts">
  import "mapbox-gl/dist/mapbox-gl.css"

  import mapboxgl from "mapbox-gl"

  const runtimeConfig = useRuntimeConfig()
  const map = ref<mapboxgl.Map>()
  const mapRef = useTemplateRef<HTMLDivElement>("map")

  mapboxgl.accessToken = runtimeConfig.public.mapboxAccessToken

  onMounted(() => {
    map.value = new mapboxgl.Map({
      container: mapRef.value!,
    })
  })

  onUnmounted(() => {
    map.value!.remove()
    map.value = undefined
  })
</script>

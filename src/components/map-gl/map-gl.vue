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

  const colorMode = useColorMode()
  const isDark = computed(() => colorMode.preference === "dark")

  const DARK_MAP_STYLE = "mapbox://styles/mapbox/dark-v11"
  const LIGHT_MAP_STYLE = "mapbox://styles/mapbox/light-v11"

  watch(isDark, () => {
    if (!map.value) return undefined

    map.value.setStyle(isDark.value ? DARK_MAP_STYLE : LIGHT_MAP_STYLE)
  })

  onMounted(() => {
    map.value = new mapboxgl.Map({
      container: mapRef.value!,
      style: isDark.value ? DARK_MAP_STYLE : LIGHT_MAP_STYLE,
    })
  })

  onUnmounted(() => {
    map.value!.remove()
    map.value = undefined
  })
</script>

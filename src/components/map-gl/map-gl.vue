<template>
  <div ref="map" class="h-full w-full bg-background" />
</template>

<script setup lang="ts">
  import "mapbox-gl/dist/mapbox-gl.css"

  import mapboxgl from "mapbox-gl"

  const DARK_MAP_STYLE = "mapbox://styles/mapbox/dark-v11"
  const LIGHT_MAP_STYLE = "mapbox://styles/mapbox/light-v11"

  const runtimeConfig = useRuntimeConfig()
  const colorMode = useColorMode()

  const map = ref<mapboxgl.Map>()
  const mapRef = useTemplateRef<HTMLDivElement>("map")

  const isDark = computed(() => colorMode.value === "dark")

  watch(isDark, () => {
    if (!map.value) return undefined

    map.value.setStyle(isDark.value ? DARK_MAP_STYLE : LIGHT_MAP_STYLE)
  })

  onMounted(() => {
    mapboxgl.accessToken = runtimeConfig.public.mapboxAccessToken

    map.value = new mapboxgl.Map({
      container: mapRef.value!,
      style: isDark.value ? DARK_MAP_STYLE : LIGHT_MAP_STYLE,
      minZoom: 0,
      maxZoom: 20,
      dragRotate: false,
      renderWorldCopies: false,
      attributionControl: false,
      antialias: true,
      projection: "mercator",
    })
  })

  onUnmounted(() => {
    if (process.env.NODE_ENV === "development") return undefined

    map.value!.remove()
    map.value = undefined
  })
</script>

<style>
  .mapboxgl-ctrl-logo {
    display: none !important;
  }
</style>

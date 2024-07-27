<template>
  <v-form>
    <v-text-field v-model="latitude" label="Latitude" @keydown.enter="send"></v-text-field>
    <v-text-field v-model="longitude" label="Longitude" @keydown.enter="send"></v-text-field>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    latitude: 0.0,
    longitude: 0.0
  }),
  emits: ['sendPosition'],
  mounted() {
    this.getCurrentLocation()
  },
  methods: {
    getCurrentLocation() {
      if (!navigator.geolocation) {
        return
      }
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        console.log('location componente:', this.latitude, this.longitude)
      })
    },
    send() {
      if (!this.latitude || !this.longitude) return
      this.$emit('sendPosition', [this.latitude, this.longitude])
    }
  }
}
</script>

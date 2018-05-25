/*
In this page, we will get the user position and send it to the database (to update the operator's map)
*/
<template>
  <div>
    <p>Your path : {{path}}</p>
    <p>Lat : {{lat}}</p>
    <p>Lng : {{lng}}</p>
  </div>
</template>

<script>
export default {
  props: ['path'],
  data () {
    return {
      lat: undefined,
      lng: undefined
    }
  },
  mounted () {
    // Send the location directly whe the page is loaded
    this.$nextTick(() => this.updateLocation())
  },
  methods: {
    updateLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude
          this.lng = position.coords.longitude
          this.sendLocation()
        })
      }
    },
    sendLocation () {
      if (this.lat !== undefined && this.lng !== undefined) {
        const data = [
          this.lat,
          this.lng
        ]
        this.$socket.emit('send', this.path.substring(1), data)
      }
    }
  }
}
</script>

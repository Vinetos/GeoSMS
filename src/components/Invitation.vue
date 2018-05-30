/*
In this page, we will get the user position and send it to the database (to update the operator's map)
* todo Create a page
*/
<template>
  <div>
    <div id="google-map">
      <google-map />
    </div>
  </div>
</template>

<style scoped>
  #google-map {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
</style>

<script>
import GoogleMap from './GoogleMap'
import {gmapApi} from 'vue2-google-maps'

export default {
  props: ['path'],
  components: {
    GoogleMap
  },
  computed: {
    google: gmapApi
  },
  data () {
    return {
      lat: undefined,
      lng: undefined,
      lastPatientLocationMarker: undefined,
      location: undefined
    }
  },
  mounted () {
    // Send the location directly when the page is loaded (every 20s)
    this.updateLocation()
    this.$nextTick(() => setInterval(this.updateLocation, 20000))
  },
  methods: {
    updateLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude
          this.lng = position.coords.longitude
          this.sendLocation()
          this.updateMap()
        }, undefined, {enableHighAccuracy: true})
      }
    },
    sendLocation () {
      if (this.lat !== undefined && this.lng !== undefined) {
        this.$socket.emit('send', this.path.substring(1), {
          lat: this.lat, lng: this.lng
        })
      }
    },
    updateMap () {
      if (this.lastPatientLocationMarker) {
        this.lastPatientLocationMarker.setMap(null)
      }
      const map = this.$store.state.theGoogleMap
      // Show a label (and maybe the closest road name ?)
      const marker = new this.google.maps.Marker({
        position: {lat: this.lat, lng: this.lng},
        map: map,
        title: 'Your location',
        label: 'P',
        animation: !this.lastPatientLocationMarker ? this.google.maps.Animation.DROP : undefined
      })
      if (!this.lastPatientLocationMarker) {
        map.setZoom(17)
        map.setCenter(marker.position)
      }
      this.lastPatientLocationMarker = marker
    }
  }
}
</script>

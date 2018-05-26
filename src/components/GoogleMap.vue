<template>
  <GmapMap class="google-map" ref="map" :center="{lat:mapInfo.lat, lng:mapInfo.lng}" :zoom="6"
           map-type-id="hybrid">
  </GmapMap>
</template>

<style scoped>
  .google-map {
    height: 100%;
    width: 100%;
  }
</style>

<script>
import store from '../store/AppStore'
import {mapGetters} from 'vuex'
import {gmapApi} from 'vue2-google-maps'

export default {
  name: 'google-map',
  store: store,
  computed: {
    ...mapGetters(['mapInfo']),
    google: gmapApi
  },
  mounted () {
    // Disable default UI
    this.$refs.map.$mapPromise.then((map) => {
      const mapOptions = {
        disableDefaultUI: true
      }
      map.setOptions(mapOptions)
    })
    // Auto display traffic information
    this.$refs.map.$on('zoom_changed', () => { this.updateTrafficOnMap() })
    // Auto-set dark mode the night
    const hours = (new Date()).getHours()
    if (hours >= 21 || hours <= 8) { this.setDarkMode() }
  },
  methods: {
    setDarkMode: function () {
      // Update style
      this.$refs.map.$mapPromise.then((map) => {
        const mapOptions = {
          styles: darkMode
        }
        map.setOptions(mapOptions)
        // Change the map type to better view
        map.setMapTypeId('roadmap')
      })
    },
    updateTrafficOnMap: function (force = false) {
      this.$refs.map.$mapPromise.then((map) => {
        const shouldBeEnabled = map.getZoom() >= 10
        if (this.trafficLayer) {
          this.trafficLayer.setMap(null)
          this.trafficLayer = null
        }

        if (shouldBeEnabled || force) {
          this.trafficLayer = new this.google.maps.TrafficLayer()
          this.trafficLayer.setMap(map)
        }
      })
    }
  }

}

const darkMode = [{
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#242f3e'
    }
  ]
},
{
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#746855'
    }
  ]
},
{
  'elementType': 'labels.text.stroke',
  'stylers': [
    {
      'color': '#242f3e'
    }
  ]
},
{
  'featureType': 'administrative.locality',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#d59563'
    }
  ]
},
{
  'featureType': 'poi',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#d59563'
    }
  ]
},
{
  'featureType': 'poi.park',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#263c3f'
    }
  ]
},
{
  'featureType': 'poi.park',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#6b9a76'
    }
  ]
},
{
  'featureType': 'road',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#38414e'
    }
  ]
},
{
  'featureType': 'road',
  'elementType': 'geometry.stroke',
  'stylers': [
    {
      'color': '#212a37'
    }
  ]
},
{
  'featureType': 'road',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#9ca5b3'
    }
  ]
},
{
  'featureType': 'road.highway',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#746855'
    }
  ]
},
{
  'featureType': 'road.highway',
  'elementType': 'geometry.stroke',
  'stylers': [
    {
      'color': '#1f2835'
    }
  ]
},
{
  'featureType': 'road.highway',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#f3d19c'
    }
  ]
},
{
  'featureType': 'transit',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#2f3948'
    }
  ]
},
{
  'featureType': 'transit.station',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#d59563'
    }
  ]
},
{
  'featureType': 'water',
  'elementType': 'geometry',
  'stylers': [
    {
      'color': '#17263c'
    }
  ]
},
{
  'featureType': 'water',
  'elementType': 'labels.text.fill',
  'stylers': [
    {
      'color': '#515c6d'
    }
  ]
},
{
  'featureType': 'water',
  'elementType': 'labels.text.stroke',
  'stylers': [
    {
      'color': '#17263c'
    }
  ]
}]
</script>

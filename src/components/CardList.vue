<template>
  <div id="card-list">
    <Card title="GeoSMS"
          description="Welcome to GeoSMS. It allow you to get the patient GPS coordinates by sending its custom url."/>
    <Card title="SMS" description="Here you will generate an URL and send it in a SMS.">
      <br/>
      <br/>
      <a>1. Enter the phone-number :</a>
      <vue-tel-input v-model="phone"/>
      <br/>
      <a>2. Generate and send the SMS : </a>
      <button type="button" v-on:click="sendSms">Generate and Send</button>
      <div v-if="generatedUrl">
        <br/>
        <a>Patient's URL :</a>
        <a target="_blank" :href="generatedUrl">{{generatedUrl}}</a>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from './Card'
import Invitation from './Invitation'
import {gmapApi} from 'vue2-google-maps'

export default {
  name: 'CardList',
  components: {
    Card,
    Invitation
  },
  data () {
    return {
      phone: '',
      generatedUrl: undefined,
      lastPatientLocationMarker: undefined
    }
  },
  computed: {
    google: gmapApi
  },
  mounted () {
    this.$options.sockets.update = (data) => {
      if (this.lastPatientLocationMarker) {
        this.lastPatientLocationMarker.setMap(null)
      }
      const map = this.$store.state.theGoogleMap
      this.lastPatientLocationMarker = new this.google.maps.Marker({
        position: data,
        map: map,
        title: 'Last patient\'s location',
        animation: this.google.maps.Animation.DROP
      })
      map.setCenter(this.lastPatientLocationMarker.position)
      this.smoothZoom(map, 17)
    }
  },
  methods: {
    /**
       * We send an sms to the patient and create a room on the socket server
       * to get back the patient location when we have it
       */
    sendSms () {
      // Ignore this.phone for now
      // We use timestamp as uniq id for the patient url
      const timeStamp = Date.now()
      this.$socket.emit('register', timeStamp)
      this.generatedUrl = window.location.href + timeStamp
      console.log(this.generatedUrl) // Access to url/timeStamp to send your position
    },
    /**
       * Animate the map we we zoom on the marker
       */
    smoothZoom (map, zoomLevel) {
      const step = 1
      // Calculate the new zoom
      let zoom = map.getZoom()
      if (zoom > zoomLevel) {
        zoom -= step
      } else if (zoom < zoomLevel) {
        zoom += step
      } else {
        return
      }

      map.setZoom(zoom)
      setTimeout(() => {
        this.smoothZoom(map, zoomLevel)
      }, 80)
    }
  }
}
</script>

<style scoped>
  /* Space between cards */
  #card + #card {
    margin-top: 5px;
  }

  #vue-tel-input {
    float: left;
  }
</style>

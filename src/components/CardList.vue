<template>
  <div id="card-list">
    <Card title="GeoSMS"
          description="Welcome to GeoSMS. It allow you to get the patient GPS coordinates by sending its custom url."/>
    <Card title="SMS" description="Here you will generate an URL and send it in a SMS.">
      <br/>
      <div v-if="!generatedUrl">
        <br/>
        <a>1. Enter the phone-number :</a>
        <vue-tel-input v-model="phone"/>
        <br/>
        <a>2. Generate and send the SMS : </a>
        <button type="button" v-on:click="sendSms">Generate and Send</button>
      </div>
      <div v-if="generatedUrl">
        <br/>
        <a>Patient's URL :</a>
        <a target="_blank" :href="generatedUrl" style="font-size: 14px; text-decoration: underline">{{generatedUrl}}</a>
        <br/>
        <br/>
        <p style="font-size: 12px; font-style: italic">We don't have sent an SMS because we don't have a provider. Just click on the link. It's the same as the one that would have been sent. </p>
      </div>
    </Card>
    <div v-if="location">
      <Card title="Patient" description="Here you can find pieces of information about the patient : ">
        <br/>
        <br/>
        <p><b>Latitude : </b>{{location.lat}}</p>
        <p><b>Longitude : </b>{{location.lng}}</p>
      </Card>
    </div>
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
      lastPatientLocationMarker: undefined,
      location: undefined
    }
  },
  computed: {
    google: gmapApi
  },
  mounted () {
    this.$options.sockets.update = (data) => {
      this.location = data
      if (this.lastPatientLocationMarker) {
        this.lastPatientLocationMarker.setMap(null)
      }
      const map = this.$store.state.theGoogleMap
      // Show a label (and maybe the closest road name ?)
      const marker = new this.google.maps.Marker({
        position: data,
        map: map,
        title: 'Last patient\'s location',
        label: 'P',
        animation: !this.lastPatientLocationMarker ? this.google.maps.Animation.DROP : undefined
      })
      if (!this.lastPatientLocationMarker) {
        this.smoothZoom(map, 17)
        map.setCenter(marker.position)
      }
      this.lastPatientLocationMarker = marker
    }
  },
  methods: {
    /**
       * We send an sms to the patient and create a room on the socket server
       * to get back the patient location when we have it
       */
    sendSms () {
      // Here you can add your function to send an SMS.
      // For now, We will just create a link
      // We use timestamp as unique id for the patient url
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
  #card {
    margin-top: 5px;
  }

  #vue-tel-input {
    float: left;
  }
</style>

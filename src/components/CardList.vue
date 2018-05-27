<template>
  <div id="card-list">
    <Card title="Welcome" description="Welcome to GeoSMS."/>
    <Card title="SMS" description="Send an SMS">
      <vue-tel-input v-model="phone" />
      <br/>
      <button type="button" v-on:click="sendSms">Send SMS !</button>
      </Card>
    <Card :description="generatedUrl"/>
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
      const map = this.$store.state.theGoogleMap;
      this.lastPatientLocationMarker = new this.google.maps.Marker({
        position: data,
        map: map,
        title: 'Last patient\'s location'
      })
      map.setZoom(17)
      map.panTo(this.lastPatientLocationMarker.position)
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

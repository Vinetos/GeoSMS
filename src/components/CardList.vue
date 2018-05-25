<template>
  <div id="card-list">
    <Card title="Welcome" description="Welcome to GeoSMS."/>
    <Card title="SMS" description="Send an SMS">
      <vue-tel-input v-model="phone" />
      <button type="button" v-on:click="sendSms">Click Me!</button>
      </Card>
    <Card :description="generatedUrl"/>
  </div>
</template>

<script>
import Card from './Card'
import Invitation from './Invitation'

export default {
  name: 'CardList',
  components: {
    Card,
    Invitation
  },
  props: ['fullPath'],
  data () {
    return {
      phone: '',
      generatedUrl: undefined
    }
  },
  mounted () {
    this.$options.sockets.update = (data) => {
      // todo Add marker with the position
      // console.log(data)
    }
  },
  methods: {
    /**
     * We send an sms to the patient and create a room on the socket server
     * to get back the patient location when we have it
     */
    sendSms () {
      // Ignore this.phone for now
      const timeStamp = Date.now()
      this.$socket.emit('register', timeStamp)
      this.generatedUrl = timeStamp + ''
      console.log(this.generatedUrl)
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

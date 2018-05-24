<template>
  <div id="card-list">
    <Card title="Welcome" description="Welcome to GeoSMS."/>
    <Card title="SMS" description="Send an SMS">
      <vue-tel-input v-model="phone" @onInput="onInput" />
      <!-- <button type="button">Click Me!</button> -->
      </Card>
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'CardList',
  components: {
    Card
  },
  data () {
    return {
      phone: ''
    }
  },
  methods: {
    /**
     * @param {string} number
     * the phone number inputted by user, will be formatted along with country code
     * // Ex: inputted: (AU) 0432 432 432
     * // number = '+61432421546'
     *
     * @param {Boolean} isValid
     * @param {string} country
     */
    onInput ({ number, isValid, country }) {
      console.log(number, isValid, country)
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

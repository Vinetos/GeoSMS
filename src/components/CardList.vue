<template>
  <div id="card-list">
    <Card title="Welcome" description="Welcome to GeoSMS."/>
    <Card />
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'CardList',
  components: {
    Card
  }
}
</script>

<style scoped>
  /* Space between cards */
  #card + #card {
    margin-top: 5px;
  }
</style>

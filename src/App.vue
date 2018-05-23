<template>
  <div id="app">
    <div id="google-map">
      <google-map />
    </div>
    <div id="card-list">
      <Card />
      <Card />
    </div>
  </div>
</template>

<script>
import GoogleMap from './components/GoogleMap'
import Card from './components/Card'

export default {
  name: 'App',
  components: {
    Card,
    GoogleMap
  }
}
</script>

<style scoped>
#google-map {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
}
#card-list {
  float: left;
  margin-top: 3em;
  margin-left: 10px;
  position: absolute;
  width: 300px;
}
</style>

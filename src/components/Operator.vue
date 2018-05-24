<template>
  <div id="app">
    <div id="google-map">
      <google-map />
    </div>
    <CardList id="card-list" />
  </div>
</template>

<script>
import GoogleMap from './GoogleMap'
import CardList from './CardList'

export default {
  name: 'Operator',
  components: {
    CardList,
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
    margin-top: 1em;
    margin-left: 10px;
    position: absolute;
    width: 300px;
  }
</style>

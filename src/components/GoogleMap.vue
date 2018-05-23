<template>
  <GmapMap class="google-map" ref="map" :center="{lat:46.52863469527167, lng:2.43896484375}" :zoom="6" map-type-id="terrain">
  </GmapMap>
</template>

<script>
import store from '../store/AppStore'
import {mapGetters} from 'vuex'

export default {
  name: 'google-map',
  store: store,
  computed: {
    ...mapGetters(['mapInfo'])
  }
}
</script>

<style scoped>
  .google-map {
    height: 100%;
    width: 100%;
  }
</style>

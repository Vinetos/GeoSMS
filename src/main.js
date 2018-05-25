// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'vue-tel-input/dist/vue-tel-input.css'
import VueTelInput from 'vue-tel-input'
import VueSocketio from 'vue-socket.io';

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDaUzCfHBBxHd-AweAhrC-tsV5_stILiZQ',
    libraries: 'places'
  },
  autobindAllEvents: false
})
Vue.use(VueTelInput)

Vue.use(VueSocketio, 'http://localhost:3000')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(require('./App').default)
})

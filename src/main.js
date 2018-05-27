import 'es6-promise/auto'
import Vue from 'vue'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'vue-tel-input/dist/vue-tel-input.css'
import VueTelInput from 'vue-tel-input'
import VueSocketio from 'vue-socket.io'
import store from './store/AppStore'

Vue.config.productionTip = false

// The google map API
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDaUzCfHBBxHd-AweAhrC-tsV5_stILiZQ',
    libraries: 'places'
  },
  autobindAllEvents: false
})

// Input type for phone number
Vue.use(VueTelInput)

// The socket.io server address
Vue.use(VueSocketio, 'http://localhost:3000')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  render: h => h(require('./App').default)
})

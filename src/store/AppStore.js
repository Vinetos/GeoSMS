import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    mapInfo: {
      lat: 45.588444,
      lng: 5.089858999999933
    }
  },
  mutations: {},
  action: {},
  getters: {
    mapInfo: state => state.mapInfo
  },
  strict: true
})

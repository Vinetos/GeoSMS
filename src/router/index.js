import Vue from 'vue'
import Router from 'vue-router'

import Operator from '../components/Operator'
import Invitation from '../components/Invitation'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // Main path
    {
      path: '/',
      name: 'Operator',
      component: Operator
    },
    // All other path
    {
      path: '*',
      component: Invitation,
      props: (route) => ({
        path: route.path
      })
    }
  ]
})

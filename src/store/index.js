import Vue from 'vue'
import Vuex from 'vuex'

import TopBar from '../store/moudles/topBar'
import Login from '../store/moudles/login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    TopBar,
    Login
  }
})

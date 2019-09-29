import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import test from './modules/test'
import css from './modules/css'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test,
    user,
    common,
    css,
    tagsView
  },
  getters
})

export default store

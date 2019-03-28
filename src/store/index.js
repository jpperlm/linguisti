import Vue from 'vue'
import Vuex from 'vuex'

import languageStore from './options'
import gameStore from './game'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      languageStore,
      gameStore
    }
  })
  return Store
}

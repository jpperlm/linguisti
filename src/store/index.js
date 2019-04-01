import Vue from 'vue'
import Vuex from 'vuex'

import languageStore from './options'
import gameStore from './game'
import appstate from './appstate'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      languageStore,
      gameStore,
      appstate
    }
  })
  return Store
}

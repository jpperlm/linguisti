import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/components/Splash'
import Loading from '@/components/LoadingScreen'
import Game from '@/components/Game'
import LanguageOptions from '@/components/LanguageOptions'
import Games from '@/components/Games'

import Restart from '@/components/Restart'

Vue.use(Router)
export default new Router({
  // eslint-disable-next-line no-extra-boolean-cast
  mode: window.location.href.includes('index.html') ? '' : 'history',
  routes: [
    {
      path: '/',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/splash',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/languageoptions',
      name: 'LanguageOptions',
      component: LanguageOptions
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/restart',
      name: 'Restart',
      props: true,
      component: Restart
    }
  ]
})

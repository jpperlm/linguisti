import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/components/Splash'
import Loading from '@/components/LoadingScreen'
import Game from '@/components/Game'
import Restart from '@/components/Restart'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/restart',
      name: 'Restart',
      props: true,
      component: Restart
    }
  ]
})

<template>
  <div id="app" class="white-text gradient">
    <!-- <img src="./assets/logo.png"> -->
    <navHeader :showSidebar="showSidebar" />
    <hamburger :invert="showSidebar" />
    <back :invert="showSidebar" />
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import navHeader from '@/components/NavHeader'
import hamburger from '@/components/Hamburger'
import back from '@/components/Back'

export default {
  name: 'App',
  components: {
    navHeader,
    hamburger,
    back
  },
  computed: {
    ...mapState({
      showSidebar: state => state.appstate.showSidebar
    })
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* font-family: monsterrat; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  height: 100vh;
  width: 100vw;
  /* background: #f9fbfb; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  /* margin-top: 3%; */
}
.gradient {
  z-index: -1;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
#linguisti-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 90vw;
}
@media only screen and (min-width: 600px) and (max-width: 1400px) {
  #linguisti-container {
    min-width: 600px;
    max-width: 60%;
    margin: auto;
  }
}
@media only screen and (min-width: 1400px) {
  #linguisti-container {
    max-width: 800px;
    margin: auto;
  }
}
.flex-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.space-evenly {
  justify-content: space-evenly !important;
}
.full-width {
  width: 100%;
}
.rounded {
  border-radius: 15px;
}
.clickable {
  cursor: pointer;
}
.primary-color {
  /* background: #1f1c2a !important; */
  background: #151221 !important;
}
.primary-lighter {
  /* background: #2c2541 !important; */
  background: #2c2c2d !important;
}
.primary-lightest {
  /* background: #392e5c !important; */
  background: #2c2c2d !important;
}
.secondary-color {
  background: #e80012 !important;
}
.tertiary-color {
  background: #19ceb0;
}

.accent-color-2 {
  background: #24ffff !important;
}
.dark-grey-custom {
  background: #3a4a4d !important;
}
.light-grey-custom {
  background: #f9fbfb !important;
}

.white-text {
  color: #fdfdfe;
}
.light-grey-text {
  color: #f9fbfb;
}
.primary-color-text {
  color: #151221;
}
.secondary-color-text {
  color: #e80012;
}
.accent-color-2-text {
  color: #24ffff !important;
}
</style>

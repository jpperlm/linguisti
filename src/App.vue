<template>
  <div id="app" class="primary-color white-text">
    <!-- <img src="./assets/logo.png"> -->
    <navHeader />
    <router-view />
  </div>
</template>

<script>
import navHeader from '@/components/NavHeader'

export default {
  name: 'App',
  components: {
    navHeader
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
#linguisti-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 40px);
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
.rounded {
  border-radius: 15px;
}
.clickable {
  cursor: pointer;
}
.primary-color {
  background: #1f1c2a !important;
}
.primary-lighter {
  background: #2c2541 !important;
}
.primary-lightest {
  background: #392e5c !important;
}
.secondary-color {
  background: #e80012 !important;
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
.secondary-color-text {
  color: #e80012;
}
.accent-color-2-text {
  color: #24ffff !important;
}
</style>

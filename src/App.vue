<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
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
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  background: #f9fbfb;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* margin-top: 3%; */
}
#linguisti-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
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
.primary-color {
  background: #24ffff;
}
.accent-color-1 {
  background: #ff2457;
}
.accent-color-2 {
  background: #ffa724;
}
.dark-grey-custom {
  background: #3a4a4d;
}
.light-grey-custom {
  background: #f9fbfb;
}
</style>

<template>
  <div id="navheader" :class="{ hidden: !showSidebar }">
    <div
      id="navheader-inside"
      :class="{ hidden: !showSidebar }"
      class="secondary-color primary-color-text"
    >
      <div id="navitems" :class="{ hidden: !showSidebar }">
        <div class="nav-item">Home</div>
        <div class="nav-item">Languages</div>
        <div class="nav-item">About</div>
        <div class="nav-item">Settings</div>

        <div class="flex-spacer"></div>
        <div id="nav-link-perlman-labs" class="nav-item">
          Plabs
        </div>
      </div>
    </div>
    <div
      id="nav-grey"
      @click="$store.commit('appstate/toggleSidebar')"
      :class="{ hidden: !showSidebar }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  components: {},
  props: ['showSidebar'],
  mounted () {},
  methods: {
    // navBackwards () {
    //   let route = this.$route.name
    //   let prevRoute = this.routeMap[route]
    //   this.navTo(prevRoute)
    // },
    // navTo (r) {
    //   this.$router.push({ name: r })
    // }
  },
  computed: {},
  data () {
    return {
      // routeMap: {
      //   Splash: 'Loading',
      //   LanguageOptions: 'Splash',
      //   Games: 'LanguageOptions',
      //   Game: 'Games',
      //   Restart: 'Games'
      // }
    }
  }
}
</script>

<style scoped>
#navheader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  z-index: 1;
}
#navheader.hidden {
  transition: width 0s ease-in-out 1s;
  width: 0 !important;
}

#navheader-inside {
  width: 20vw;
  max-width: 200px;
  min-width: 100px;
  height: 100vh;
  padding-top: calc(6vh + 30px);
  transition: all 1s ease-in-out;
}
#navheader-inside.hidden {
  width: 0 !important;
  min-width: 0px !important;
}
.nav-item:first-child {
  border-top: 1px solid black;
}
#nav-grey {
  flex-grow: 1;
  background: black;
  opacity: 0.7;
  transition: all 1s ease-in-out;
}
#nav-grey.hidden {
  opacity: 0 !important;
}

#navitems.hidden {
  opacity: 0 !important;
}
#navitems {
  transition: all 1s ease-in-out;
  height: calc(94vh - 30px);
  display: flex;
  flex-direction: column;
}
.nav-item:first-of-type {
  /* padding-top: 20px; */
}
.nav-item {
  padding: 5px;
  border-bottom: 1px solid black;
}
.flex-spacer {
  flex-grow: 1;
}
</style>

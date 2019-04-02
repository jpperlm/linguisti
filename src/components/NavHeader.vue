<template>
  <div id="navheader" :class="{ hidden: !showSidebar }">
    <div
      id="navheader-inside"
      :class="{ hidden: !showSidebar }"
      class="secondary-color"
    >
      <div id="navitems" :class="{ hidden: !showSidebar }">
        <div class="nav-item">blah</div>
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
  transition: width 1s ease-in-out;
  width: 0 !important;
}

#navheader-inside {
  width: 20vw;
  max-width: 200px;
  height: 100vh;
  padding-top: calc(6vh + 30px);
  transition: all 1s ease-in-out;
}
#navheader-inside.hidden {
  width: 0 !important;
}
.nav-item:first-child {
  border-top: 1px solid black;
}
#nav-grey {
  flex-grow: 1;
  background: #a59494;
  opacity: 0.5;
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
}
</style>

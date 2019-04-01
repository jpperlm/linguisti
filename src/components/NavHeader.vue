<template>
  <div id="navheader" class="secondary-color" :class="{ hidden: !showSidebar }">
    <div id="navitems" :class="{ hidden: !showSidebar }"><div>blah</div></div>
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
  width: 10vw;
  max-width: 200px;
  height: 100vh;
  padding-top: calc(3% + 30px);
  transition: all 1s ease-in-out;
}
#navheader.hidden {
  width: 0 !important;
}
#navitems.hidden {
  opacity: 0 !important;
}
#navitems {
  transition: all 1s ease-in-out;
}
</style>

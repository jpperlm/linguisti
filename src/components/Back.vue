<template>
  <div
    id="hamburger"
    :class="{
      'white-text': !invert,
      'primary-color-text': invert
    }"
    @click="navBackwards"
  >
    <font-awesome-icon size="2x" icon="arrow-left" />
  </div>
</template>

<script>
export default {
  name: 'Back',
  props: ['invert'],
  components: {},
  mounted () {},
  methods: {
    navBackwards () {
      let route = this.$route.name
      let prevRoute = this.routeMap[route]
      this.navTo(prevRoute)
    },
    navTo (r) {
      this.$router.push({ name: r })
    }
  },
  computed: {},
  data () {
    return {
      routeMap: {
        Splash: 'Loading',
        LanguageOptions: 'Splash',
        Games: 'LanguageOptions',
        Game: 'Games',
        Restart: 'Games'
      }
    }
  }
}
</script>

<style scoped>
#hamburger {
  position: fixed;
  top: 3%;
  left: calc(97% - 45px);
  z-index: 999;
  transition: all 1s ease-in-out;
  cursor: pointer;
}
/* #hamburger.primary-color-text {
  left: calc(50px - 15px);
}
@media only screen and (min-width: 500px) {
  #hamburger.primary-color-text {
    left: calc(10vw - 15px);
  }
}
@media only screen and (min-width: 1000px) {
  #hamburger.primary-color-text {
    left: 85px;
  }
} */
</style>

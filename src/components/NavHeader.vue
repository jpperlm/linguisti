<template>
  <div id="navheader" class="primary-lightest secondary-color-text">
    <div class="header-icon-container" @click="navBackwards">
      <font-awesome-icon class="header-icon" icon="undo" />
    </div>
    <div>Perlman - Linguisti</div>
    <div class="header-icon-container">
      <div class="header-icon" id="header-info-btn">&#8505;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
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
#navheader {
  height: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: 80px 1fr 80px;
  /* background: red; */
}
.header-icon {
  width: 20px;
  height: 20px;
}
.header-icon-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
#header-info-btn {
  border: 1.5px solid #e80012;
  border-radius: 100%;
  font-weight: bold;
  font-size: 1.1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>

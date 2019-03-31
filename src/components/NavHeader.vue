<template>
  <div id="navheader" class="secondary-color-text">
    <div class="header-icon-container border-right" @click="navBackwards">
      <font-awesome-icon
        class="header-icon"
        size="2x"
        icon="angle-double-left"
      />
    </div>
    <div id="nav-title" class="flex-center"><div>Linguisti</div></div>
    <div class="header-icon-container border-left">
      <div class="header-icon-fixed header-icon" id="header-info-btn">i</div>
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
  background-image: linear-gradient(#2c2541, #392e5c);
  /* background: red; */
}
.header-icon-fixed {
  width: 20px;
  height: 20px;
}
.header-icon-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: serif;
}
.header-icon-container.border-left {
  border-left: 1px solid #1f1c2a;
}
.header-icon-container.border-right {
  border-right: 1px solid #1f1c2a;
}
#nav-title {
  font-size: 1.4em;
  font-family: fantasy;
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

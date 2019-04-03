<template>
  <div id="navheader" :class="{ hidden: !showSidebar }">
    <div
      id="navheader-inside"
      :class="{ hidden: !showSidebar }"
      class="tertiary-color primary-color-text"
    >
      <div id="navitems" :class="{ hidden: !showSidebar }">
        <navItem :key="item.label" v-for="item in navItems" :data="item" />
        <div class="flex-spacer"></div>

        <div id="nav-link-perlman-labs" class="nav-item">
          Plabs
        </div>
      </div>
    </div>
    <div
      id="nav-grey"
      @click="$store.dispatch('appstate/toggleSidebar', false)"
      :class="{ hidden: !showSidebar }"
    ></div>
  </div>
</template>

<script>
import navItem from '@/components/nav/NavbarItem'
export default {
  name: 'Nav',
  components: { navItem },
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
      navItems: [
        {
          label: 'Home',
          action: 'Loading'
        },
        {
          label: 'Language',
          action: 'Splash'
        }
        // {
        //   label: 'About'
        // },
        // {
        //   label: 'Settings'
        // }
      ]
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
  z-index: 998;
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

<template>
  <div
    id="hamburger"
    :class="{
      'white-text': !invert,
      'primary-color-text': invert
    }"
    @click="$store.commit('appstate/toggleSidebar')"
  >
    <font-awesome-icon size="2x" icon="bars" />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: ['invert'],
  components: {},
  mounted () {},
  methods: {},
  computed: {},
  data () {
    return {}
  }
}
</script>

<style scoped>
#hamburger {
  position: fixed;
  top: 3%;
  left: 3%;
  z-index: 999;
  transition: all 1s ease-in-out;
  cursor: pointer;
}
#hamburger.primary-color-text {
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
}
</style>

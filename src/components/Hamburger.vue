<template>
  <div
    id="hamburger"
    :class="{
      'secondary-color-text': !invert,
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
  left: calc(5vw - 15px);
  z-index: 10;
  transition: all 1s ease-in-out;
}
</style>

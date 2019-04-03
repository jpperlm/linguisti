<template>
  <div @click="clicky" class="nav-item">{{ data.label }}</div>
</template>

<script>
export default {
  name: 'NavItem',
  props: ['data'],
  mounted () {},
  methods: {
    clicky () {
      if (this.data.action) {
        this.$store.dispatch('appstate/toggleSidebar', false)
        this.$router.push({ name: this.data.action })
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.nav-item:first-child {
  border-top: 1px solid black;
}
.nav-item {
  padding: 5px;
  border-bottom: 1px solid black;
  cursor: pointer;
}
</style>

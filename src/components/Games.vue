<template>
  <div id="linguisti-container">
    <h1>Linguisti</h1>
    <template>
      <h2>Select A Game</h2>
      <OptionList
        :showMax="6"
        :list="games"
        :keyMap="keyMap"
        color="#21ef08"
        @optionSelected="optionSelected"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OptionList from '@/components/common/OptionList'

export default {
  name: 'Splash',
  components: {
    OptionList
  },
  created () {
    if (!this.language) {
      this.$router.push({ name: 'Splash' })
    }
  },
  mounted () {},
  methods: {
    optionSelected (payload) {
      this.$store.commit('gameStore/setGame', payload.item)
      this.$nextTick(() => {
        this.$router.push({ name: 'Game' })
      })
    }
  },
  computed: {
    ...mapState({
      games: state => state.gameStore.games,
      language: state => state.languageStore.language
    })
  },
  data () {
    return {
      keyMap: {
        main: 'label',
        sub: 'sub'
      }
    }
  }
}
</script>

<style scoped>
</style>

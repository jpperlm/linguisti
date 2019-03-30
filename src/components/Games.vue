<template>
  <div id="linguisti-container">
    <div class="title-header">
      <h2>Select A Game</h2>
    </div>
    <OptionList
      :showMax="6"
      :list="games"
      :keyMap="keyMap"
      color="#21ef08"
      @optionSelected="optionSelected"
    />
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
    if (!this.language || !this.itemKey) {
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
      games: state =>
        state.gameStore.games.filter(game => {
          return (
            game.allowFor.includes('all') ||
            game.allowFor.includes(state.languageStore.itemKey.key)
          )
        }),
      language: state => state.languageStore.language,
      itemKey: state => state.languageStore.itemKey
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
.title-header {
  width: 100%;
  margin-bottom: 10px;
}
</style>

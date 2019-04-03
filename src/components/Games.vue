<template>
  <div id="linguisti-container">
    <div class="title-header">
      <h2>Games</h2>
    </div>
    <OptionList
      v-if="games"
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
      games: state => {
        if (!state.languageStore.language || !state.languageStore.itemKey) {
          return
        }
        return state.gameStore.games.filter(game => {
          if (
            game.exclude &&
            game.exclude.includes(state.languageStore.itemKey.key)
          ) {
            return false
          }
          return (
            game.allowFor.includes('all') ||
            game.allowFor.includes(state.languageStore.itemKey.key)
          )
        })
      },
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

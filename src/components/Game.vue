<template>
  <component
    v-if="game"
    :is="game.key"
    :characters="characters"
    @endGame="endGame"
  ></component>
</template>

<script>
import { mapState } from 'vuex'
import typing from '@/components/games/Type'
import snake from '@/components/games/Snake'

export default {
  name: 'Game',
  components: {
    typing,
    snake
  },
  created () {
    if (!this.language || !this.game) {
      this.$router.push({ name: 'Splash' })
    }
  },
  methods: {
    endGame (payload) {
      this.$router.push({
        name: 'Restart',
        params: {
          score: payload.score,
          lastLetterEnglish: payload.lastLetterEnglish,
          lastLetterNative: payload.lastLetterNative,
          language: this.language,
          history: payload.history
        }
      })
    }
  },
  computed: {
    ...mapState({
      language: state => state.languageStore.language,
      game: state => state.gameStore.game,
      characters: state => {
        if (!state.languageStore.language) return []
        let lang = state.languageStore.language.key
        return state.languageStore.characterMap[lang]
      }
    })
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>

<template>
  <component
    v-if="game"
    :is="game.key"
    :characters="characters"
    @endGame="endGame"
    style="touch-action: none;"
  ></component>
</template>

<script>
import { mapState } from 'vuex'
import typing from '@/components/games/Type'
import snake from '@/components/games/Snake'
import memoryflip from '@/components/games/MemoryFlip'
import unlock from '@/components/games/Unlock'

export default {
  name: 'Game',
  components: {
    typing,
    snake,
    memoryflip,
    unlock
  },
  created () {
    if (!this.language || !this.game || !this.itemKey) {
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
          history: payload.history,
          characters: this.characters
        }
      })
    }
  },
  computed: {
    ...mapState({
      language: state => state.languageStore.language,
      game: state => state.gameStore.game,
      itemKey: state => state.languageStore.itemKey,
      characters: state => {
        if (!state.languageStore.language || !state.languageStore.itemKey) {
          return []
        }
        let chars =
          // eslint-disable-next-line
          state.languageStore.languageOptions[state.languageStore.language.key][
            state.languageStore.itemKey.key
          ]
        if (state.languageStore.itemKey.useAlt) {
          return chars.map(c => {
            return [c[0], c[2]]
          })
        }
        return chars
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

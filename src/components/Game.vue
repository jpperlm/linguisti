<template>
  <div id="linguisti-container" v-on:click="reFocus">
    <h1>Linguisti</h1>
    <div v-if="typeof time !== 'undefined'">{{ time }}</div>
    <template>
      <div id="scorecontainer">{{ score }}</div>
      <div id="promptcontainer">{{ character_native }}</div>
      <div>
        <input
          id="gameinput"
          v-model="entry"
          ref="typebox"
          type="text"
          autocomplete="off"
          autofill="none"
        />
      </div>
      <div v-on:click="entry = ''">
        clear
      </div>
      <div v-on:click="randomizeNewLetterIndex()">
        skip
      </div>
      <div
        id="prevletter-container"
        v-if="typeof prevLetterIndex !== 'undefined'"
      >
        <div style="width:100%;">Previous Letter</div>
        <div>{{ prev_character_native }}</div>
        <div>{{ prev_character_english }}</div>
      </div>
      <!-- <div>{{ character_english }}</div> -->
      <!-- <div v-if="language">{{ characters }}</div> -->
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Game',
  mounted () {
    this.$refs.typebox.focus()
    this.startGame()
  },
  watch: {
    entry (n) {
      if (typeof this.letterIndex === 'undefined') return
      if (n.toLowerCase() === this.character_english) {
        this.score++
        this.entry = ''
        this.randomizeNewLetterIndex()
      }
    }
  },
  methods: {
    tickClock () {
      if (this.time) {
        this.time--
        setTimeout(() => {
          this.tickClock()
        }, 1000)
        return
      }
      this.endGame()
    },
    endGame () {
      this.$router.push({
        name: 'Restart',
        params: {
          score: this.score,
          lastLetterEnglish: this.character_english,
          lastLetterNative: this.character_native,
          language: this.language
        }
      })
    },
    reFocus () {
      if (this.$refs.typebox && document.activeElement !== this.$refs.typebox) {
        this.$refs.typebox.focus()
      }
    },
    startGame () {
      this.gamePaused = false
      this.time = this.gameLength
      this.randomizeNewLetterIndex()
      this.tickClock()
    },
    randomizeNewLetterIndex () {
      this.prevLetterIndex = this.letterIndex
      this.letterIndex = Math.floor(Math.random() * this.characters.length)
    }
  },
  computed: {
    ...mapState({
      language: state => state.languageStore.language,
      characters: state =>
        state.languageStore.characterMap[state.languageStore.language.key]
    }),
    character_native () {
      if (typeof this.letterIndex === 'undefined') return
      return this.characters[this.letterIndex][0]
    },
    character_english () {
      if (typeof this.letterIndex === 'undefined') return
      return this.characters[this.letterIndex][1]
    },
    prev_character_native () {
      if (typeof this.prevLetterIndex === 'undefined') return
      return this.characters[this.prevLetterIndex][0]
    },
    prev_character_english () {
      if (typeof this.prevLetterIndex === 'undefined') return
      return this.characters[this.prevLetterIndex][1]
    }
  },
  data () {
    return {
      score: 0,
      entry: '',
      gamePaused: true,
      letterIndex: undefined,
      prevLetterIndex: undefined,
      time: undefined,
      gameLength: 5
    }
  }
}
</script>

<style scoped>
#linguisti-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}
#gameinput {
  height: 5vh;
  font-size: 1.4em;
  text-align: center;
  font-weight: bolder;
  color: #2419cc;
  margin-bottom: 5px;
}
#scorecontainer {
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 1.8em;
}
#promptcontainer {
  margin-bottom: 30px;
  font-size: 2.8em;
  font-weight: bold;
}
#prevletter-container {
  margin-top: 8%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2em;
  min-width: 40%;
}
/* @media only screen and (min-width: 768px) {
  #linguisti-container {
    width: 70%;
    min-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
} */
</style>

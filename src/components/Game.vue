<template>
  <div id="linguisti-container" v-on:click="reFocus">
    <div id="promptcontainer">{{ character_native }}</div>
    <div id="inputcontainer">
      <input
        id="gameinput"
        v-model="entry"
        ref="typebox"
        type="text"
        autocomplete="off"
        autofill="none"
        placeholder="Enter the translation..."
        pattern="[A-Za-z]*"
      />
      <div id="clear-btn" v-on:click="entry = ''">
        clear
      </div>

      <div id="timercontainer">
        <div id="timer" v-if="typeof time !== 'undefined'">
          {{ time }}
        </div>
      </div>
      <div id="skip-btn" v-on:click="randomizeNewLetterIndex(true, false)">
        skip
      </div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Game',
  created () {
    if (!this.language) {
      this.$router.push({ name: 'Splash' })
    }
  },
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
        this.randomizeNewLetterIndex(true, true)
      }
    }
  },
  methods: {
    tickClock () {
      if (this.$route.name !== 'Game') return
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
          language: this.language,
          history: this.history
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
    randomizeNewLetterIndex (record = false, correct = false) {
      if (record) {
        this.history.push({
          ...this.characters[this.letterIndex],
          correct
        })
      }
      this.prevLetterIndex = this.letterIndex
      this.letterIndex = Math.floor(Math.random() * this.characters.length)
    }
  },
  computed: {
    ...mapState({
      language: state => state.languageStore.language,
      characters: state => {
        if (!state.languageStore.language) return []
        let lang = state.languageStore.language.key
        return state.languageStore.characterMap[lang]
      }
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
      gameLength: 60,
      history: []
    }
  }
}
</script>

<style scoped>
#linguisti-container {
  height: 100vh;
}
#gameinput {
  font-size: 1.4em;
  text-align: center;
  font-weight: bolder;
  color: #2419cc;
  margin-bottom: 5px;
  width: 100%;
  height: 100%;
}
#gameinput::placeholder {
  font-size: 1em;
  font-weight: normal;
  opacity: 0.7;
}
#timercontainer {
  margin-top: 10px;
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#promptcontainer {
  margin-top: 3%;
  margin-bottom: 3%;
  font-size: 2.8em;
  font-weight: bold;
}
#prevletter-container {
  /* margin-top: 8%; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2em;
  min-width: 40%;
}
#inputcontainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 250px;
  min-height: 25px;
  height: 5vh;
}

#clear-btn,
#skip-btn {
  width: 25%;
  margin-top: 10px;
}
#timer {
  margin-bottom: 3%;
  font-size: 1.2em;
  width: 1.5em;
  height: 1.5em;
  border: 1px solid #e4d7d7;
  border-radius: 100%;
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

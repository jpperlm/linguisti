<template>
  <div id="linguisti-container">
    <template v-if="!recap">
      <div id="gameovermessage">{{ msg }}</div>
      <div id="final-score">Score: {{ score }}</div>
      <div id="finallettercontainer">
        <div class="final-prompt-text full-width">Final Prompt</div>
        <div class="flex-center space-evenly full-width">
          <div class="text-bigger">{{ lastLetterNative }}</div>
          <div class="text-bigger">{{ lastLetterEnglish }}</div>
        </div>
      </div>
      <div
        id="recap-btn"
        class="fake-button rounded primary-lighter clickable accent-color-2-text"
        v-on:click="toggleRecap()"
      >
        Game Recap
      </div>
    </template>
    <template v-else>
      <div id="recap-header">Reacp</div>
      <div id="recap-container">
        <!-- <div
          class="recap-item"
          v-for="(item, i) in history"
          :key="`recap${i}`"
          :class="{ wronganswer: !item.correct, correctanswer: item.correct }"
        >
          <div class="flex-center">{{ item['0'] }}</div>
          <div class="flex-center">{{ item['1'] }}</div>
        </div> -->
        <div
          class="recap-item-larger"
          v-for="(key, i) in Object.keys(summedHistory)"
          :key="`recap${i}`"
        >
          <div class="flex-center">{{ characters[key][0] }}</div>
          <div class="flex-center">{{ characters[key][1] }}</div>
          <div class="flex-center correctanswer">
            {{ summedHistory[key][1] !== 0 ? summedHistory[key][1] : '' }}
          </div>
          <div class="flex-center wronganswer">
            {{ summedHistory[key][0] !== 0 ? summedHistory[key][0] : '' }}
          </div>
        </div>
      </div>
      <div
        v-on:click="toggleRecap()"
        id="back-btn"
        class="fake-button rounded primary-lighter clickable accent-color-2-text"
      >
        Back
      </div>
    </template>

    <div
      v-on:click="$router.push({ name: 'Game' })"
      id="restart-btn"
      class="fake-button rounded primary-lighter clickable accent-color-2-text"
    >
      Restart
    </div>
    <div
      v-on:click="$router.push({ name: 'Games' })"
      class="fake-button rounded primary-lighter clickable accent-color-2-text"
    >
      Change Game
    </div>
    <div
      v-on:click="$router.push({ name: 'Splash' })"
      class="fake-button rounded primary-lighter clickable accent-color-2-text"
    >
      Change Language
    </div>
  </div>
</template>

<script>
export default {
  name: 'Restart',
  props: {
    score: {
      type: Number
    },
    lastLetterEnglish: {
      type: String
    },
    lastLetterNative: {
      type: String
    },
    language: {
      type: Object
    },
    history: {
      type: Array
    },
    characters: {
      type: Array
    }
  },
  computed: {
    summedHistory () {
      let r = {}
      this.history.forEach(item => {
        let characterIndex = this.characters.findIndex(c => {
          return c[0] === item[0]
        })
        if (!r[characterIndex]) {
          r[characterIndex] = {
            0: 0,
            1: 0
          }
        }
        r[characterIndex][item.correct ? 1 : 0]++
      })
      return r
    }
  },
  created () {
    if (!this.language || !this.history) {
      this.$router.push({ name: 'Splash' })
    }
  },
  mounted () {
    this.msg = this.messages[Math.floor(Math.random() * this.messages.length)]
  },
  methods: {
    toggleRecap () {
      this.recap = !this.recap
      // this.$refs.recap.style.height = '50vh'
    }
  },
  data () {
    return {
      messages: ['Nice one!', 'Awesome!', 'Dopesauce!', 'Wicked!'],
      msg: '',
      recap: false
    }
  }
}
</script>

<style scoped>
#finallettercontainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.8em;
  min-width: 40%;
  margin-bottom: 5vh;
  padding: 1%;
}

#gameovermessage {
  margin-top: 10%;
  font-size: 2.4em;
}
#final-score {
  font-size: 2.2em;
  margin-bottom: 5%;
  margin-bottom: 5%;
}
#recap-btn {
  margin: 1vh;
  padding: 1%;
}
.fake-button {
  height: 4vh;
  margin: 1vh;
  /* width: 80vw; */
  font-size: 1.1em;
  cursor: pointer;
  padding: 1%;
  width: 60%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#recap-container {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 40vh;
  margin-bottom: 5%;
  width: 70%;
  z-index: 2;
  min-height: 20vh;
}
.wronganswer {
  color: #e80012;
}
.correctanswer {
  color: #31e41c;
}
.recap-item {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-size: 1.6em;
  padding: 5px;
  font-weight: bolder;
  border-top: 1px solid #e80012;
}
.recap-item-larger {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-size: 1.6em;
  padding: 5px;
  font-weight: bolder;
  border-top: 1px solid #e80012;
}
.flex-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#recap-header {
  font-size: 1.8em;
  margin: 3vh;
}
.text-bigger {
  font-size: 2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.final-prompt-text {
  border-bottom: 1px solid #e80012;
}
</style>

<template>
  <div id="linguisti-container">
    <div id="gameovermessage">{{ msg }}</div>
    <template v-if="!recap">
      <div id="final-score">Score: {{ score }}</div>
      <div id="finallettercontainer">
        <div style="width:100%;">Final Character</div>
        <div>{{ lastLetterNative }}</div>
        <div>{{ lastLetterEnglish }}</div>
      </div>
      <div id="recap-btn" class="fake-button" v-on:click="toggleRecap()">
        Game Recap
      </div>
    </template>
    <template v-else>
      <div id="recap-header">Reacp</div>
      <div id="recap-container">
        <div
          class="recap-item"
          v-for="(item, i) in history"
          :key="`recap${i}`"
          :class="{ wronganswer: !item.correct, correctanswer: item.correct }"
        >
          <!-- <div v-if="item.correct" class="correctanswer">&#x2713;</div>
        <div v-else class="wronganswer">&#x2717;</div> -->
          <div>{{ item['0'] }}</div>
          <div>{{ item['1'] }}</div>
        </div>
      </div>
      <div v-on:click="toggleRecap()" id="back-btn" class="fake-button">
        Back
      </div>
    </template>

    <div
      v-on:click="$router.push({ name: 'Game' })"
      id="restart-btn"
      class="fake-button"
    >
      Restart
    </div>
    <div
      v-on:click="$router.push({ name: 'Splash' })"
      id="changelanguage-btn"
      class="fake-button"
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
}
#gameovermessage {
  margin-top: 10%;
  margin-bottom: 5%;
  font-size: 2.4em;
}
#final-score {
  font-size: 2.2em;
  margin-bottom: 5%;
}
#recap-btn {
  margin-bottom: 8%;
}
.fake-button {
  height: 4vh;
  margin: 1vh;
  width: 80vw;
  font-size: 1.1em;
  cursor: pointer;
}
#recap-container {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 40vh;
  margin-bottom: 5%;
  width: 40%;
  z-index: 2;
}
.wronganswer {
  color: #ff6556;
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
  border-top: 1px solid #e4d7d7;
}
#recap-header {
  font-size: 1.8em;
  margin-bottom: 2%;
}
</style>

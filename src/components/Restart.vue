<template>
  <div id="linguisti-container">
    <div id="gameovermessage">{{ msg }}</div>
    <div id="final-score">Final score: {{ score }}</div>
    <div id="finallettercontainer">
      <div style="width:100%;">Final Character</div>
      <div>{{ lastLetterNative }}</div>
      <div>{{ lastLetterEnglish }}</div>
    </div>
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
      type: Number,
      required: true
    },
    lastLetterEnglish: {
      type: String,
      required: true
    },
    lastLetterNative: {
      type: String,
      required: true
    },
    language: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.msg = this.messages[Math.floor(Math.random() * this.messages.length)]
  },
  data () {
    return {
      messages: ['Nice one!', 'Awesome!', 'Dopesauce!', 'Wicked!'],
      msg: ''
    }
  }
}
</script>

<style scoped>
#finallettercontainer {
  margin-top: 2vh;
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
  margin-bottom: 10%;
  font-size: 2.4em;
}
#final-score {
  font-size: 1.3em;
}
.fake-button {
  height: 4vh;
  margin: 1vh;
  width: 80vw;
  font-size: 1.1em;
}
</style>

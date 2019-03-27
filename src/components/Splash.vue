<template>
  <div id="linguisti-container">
    <h1>Linguisti</h1>
    <template>
      <h2>Select A Language</h2>
      <div
        class="language-btn"
        v-for="(lang, i) in slicedLanguages"
        :key="lang.key"
        :style="getBackgroundColor(i)"
        v-on:click="langClicked(lang, i)"
        ref="languageOptions"
      >
        <div class="language-label-container">
          <div class="language-english-label">
            {{ lang.alphabet || lang.language }}
          </div>
          <div class="language-native-label">
            {{ lang.native }}
          </div>
        </div>
        <div class="language-flag-container">
          <img class="flag" :src="require(`@/assets/${lang.img}`)" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Splash',
  mounted () {},
  methods: {
    getBackgroundColor (i) {
      // return `background-color:${this.backgroundColors[i % 4]}`
    },
    langClicked (l, i) {
      if (this.stopLanguageSelect) return
      this.stopLanguageSelect = true
      this.$refs.languageOptions[i].classList.add('toggleon')
      setTimeout(() => {
        this.$refs.languageOptions[i].classList.remove('toggleon')
        this.stopLanguageSelect = false
        this.$store.commit('languageStore/setLanguage', l)
        this.$nextTick(() => {
          this.$router.push({ name: 'Game' })
        })
      }, 1000)
    }
  },
  computed: {
    ...mapState({
      languages: state => state.languageStore.languages
    }),
    slicedLanguages () {
      return this.languages.slice(this.startIndex, 6)
    }
  },
  data () {
    return {
      startIndex: 0,
      stopLanguageSelect: false,
      backgroundColors: ['#F2545B', '#A93F55', '#2BA84A', 'black']
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
.language-btn {
  width: 100%;
  height: 10vh;
  border-top: 1px solid #e4d7d7;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
}
.language-btn:last-child {
  border-bottom: 1px solid #e4d7d7;
}
.language-btn:hover {
  cursor: pointer;
  background: #24ffff;
}
.language-label-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
}
.language-english-label {
  font-size: 1.3em;
  margin-left: 15%;
}
.language-native-label {
  font-style: italic;
  margin-left: 20%;
}
.language-flag-container {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flag {
  height: 5.5vh;
  width: 8vh;
}
.language-btn.toggleon {
  background: #21ef08;
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

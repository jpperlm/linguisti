<template>
  <div id="linguisti-container">
    <h1>Linguisti</h1>
    <template>
      <h2>Select A Language</h2>
      <OptionList
        :showMax="6"
        :list="languages"
        :keyMap="keyMap"
        color="#21ef08"
        @optionSelected="optionSelected"
      />
    </template>
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
  mounted () {},
  methods: {
    optionSelected (payload) {
      this.$store.commit('languageStore/setLanguage', payload.item)
      this.$nextTick(() => {
        this.$router.push({ name: 'Games' })
      })
    }
  },
  computed: {
    ...mapState({
      languages: state => state.languageStore.languages
    })
  },
  data () {
    return {
      keyMap: {
        main: 'alphabet',
        alternative: 'language',
        sub: 'native'
      }
    }
  }
}
</script>

<style scoped>
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

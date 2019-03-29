<template>
  <div id="linguisti-container">
    <div class="title-header">
      <h2>Select A Language</h2>
    </div>
    <OptionList
      :showMax="6"
      :list="languages"
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
.title-header {
  width: 100%;
  margin-bottom: 10px;
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

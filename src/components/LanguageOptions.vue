<template>
  <div id="linguisti-container">
    <div class="title-header">
      <h2>Select A Category</h2>
    </div>
    <OptionList
      v-if="opts"
      :showMax="6"
      :list="opts"
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
  name: 'LanguageOptions',
  components: {
    OptionList
  },
  created () {
    if (!this.language) {
      this.$router.push({ name: 'Splash' })
    }
  },
  mounted () {},
  methods: {
    optionSelected (payload) {
      this.$store.commit('languageStore/setItemKey', payload.item)
      this.$nextTick(() => {
        this.$router.push({ name: 'Games' })
      })
    }
  },
  computed: {
    ...mapState({
      language: state => state.languageStore.language,
      opts: state => {
        if (!state.languageStore.language) return
        let keys = Object.keys(
          state.languageStore.languageOptions[state.languageStore.language.key]
        )
        return state.languageStore.itemOptions.filter(item => {
          return keys.includes(item.key)
        })
      }
    })
  },
  data () {
    return {
      keyMap: {
        main: 'label',
        sub: 'sub'
        // alternative: 'language',
        // sub: 'native'
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

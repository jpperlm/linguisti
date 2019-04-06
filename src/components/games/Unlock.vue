<template>
  <div id="linguisti-container">
    <div class="flex-center" id="score-timer">
      <div>{{ score }}</div>
      <div>{{ timer }}</div>
    </div>
    <div class="flex-center" id="locks-container">
      <div class="surroundingLock"></div>
      <template v-for="(lock, index) in locksExpanded">
        <div
          :key="lock + index"
          class="lock black-text-shadow"
          :class="{
            locked: lockState[index],
            currentPick: pickIndex === index
          }"
          ref="lockRows"
        >
          <div class="lock-bars"></div>
          <div class="lock-text">{{ lock[0] }}</div>
          <div class="lock-bars"></div>
        </div>
        <div :key="'fill' + lock + index" class="surroundingLock"></div>
      </template>
    </div>
    <div class="flex-center black-text-shadow" id="word-bank-container">
      <div id="word-bank">
        <div
          v-for="(word, index) in wordbank"
          :key="word + index"
          class="clickable word-bank-item"
          @click="clicky(word, index)"
        >
          {{ word[1] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { helpers } from '@/js/helper'

export default {
  name: 'Unlock',
  props: ['characters'],
  mixins: [helpers],
  mounted () {
    this.startGame()
  },
  watch: {
    lockState (n) {
      if (n.length === 0) return
      if (n.includes(true)) return
      this.nextLock()
    }
  },
  methods: {
    startGame () {
      // this.time = this.gameLength
      this.randomizeLocks()
      this.tickClock()
    },
    randomizeLocks () {
      this.reset()
      for (var i = 0; i < this.numKeys; i++) {
        this.locks.push(this.randomLetterIndex())
        this.lockState.push(true)
      }
      let attempt = 0
      while (this.distractions.length < this.numDistractions) {
        let ind = this.randomLetterIndex()
        attempt++
        if (attempt > 20 || !this.locks.includes(ind)) {
          this.distractions.push(ind)
          attempt = 0
        }
      }
    },
    nextLock () {
      if (this.numKeys < 5) {
        this.numKeys++
      }
      if (this.numDistractions < 5) {
        this.numDistractions++
      }
      this.pause = true
      setTimeout(() => {
        this.score++
        this.randomizeLocks()
        this.tickClock()
      }, 1300)
    },
    reset () {
      this.locks = []
      this.pickIndex = 0
      this.lockState = []
      this.pause = false
      this.timer = this.timerReset
    },
    clicky (w, ind) {
      let correct = false
      if (this.pause) return
      let cLock = this.locks[this.pickIndex]
      if (cLock === this.wordbankInds[ind]) {
        this.$set(this.lockState, this.pickIndex, false)
        let ele = this.$refs.lockRows[this.pickIndex]
        let bars = ele.querySelectorAll('.lock-bars')
        let offset = bars[0].offsetWidth * 0.8
        bars[0].style.left = -1 * offset + 'px'
        bars[1].style.left = offset + 'px'
        this.pickIndex++
        correct = true
      }
      this.history.push({ ...w, correct })
    },
    tickClock () {
      if (this.$route.name !== 'Game') return
      if (this.pause) return
      if (this.timer) {
        this.timer--
        setTimeout(() => {
          this.tickClock()
        }, 1000)
        return
      }
      this.endGame()
    },
    endGame () {
      this.$emit('endGame', {
        score: this.score,
        lastLetterEnglish: this.locksExpanded[this.pickIndex][1],
        lastLetterNative: this.locksExpanded[this.pickIndex][0],
        history: this.history
      })
    }
  },
  computed: {
    wordbankInds () {
      return [...new Set(this.shuffle([...this.distractions, ...this.locks]))]
    },
    wordbank () {
      return this.wordbankInds.map(w => {
        return this.characters[w]
      })
    },
    locksExpanded () {
      return this.locks.map(l => {
        return this.characters[l]
      })
    }
    // character_native () {
    //   if (typeof this.letterIndex === 'undefined') return
    //   return this.characters[this.letterIndex][0]
    // },
    // character_english () {
    //   if (typeof this.letterIndex === 'undefined') return
    //   return this.characters[this.letterIndex][1]
    // },
    // prev_character_native () {
    //   if (typeof this.prevLetterIndex === 'undefined') return
    //   return this.characters[this.prevLetterIndex][0]
    // },
    // prev_character_english () {
    //   if (typeof this.prevLetterIndex === 'undefined') return
    //   return this.characters[this.prevLetterIndex][1]
    // }
  },
  data () {
    return {
      score: 0,
      gameLength: 60,
      history: [],
      locks: [],
      lockState: [],
      distractions: [],
      numKeys: 3,
      numDistractions: 2,
      pickIndex: 0,
      pause: false,
      timer: 20,
      timerReset: 20
    }
  }
}
</script>

<style scoped>
#linguisti-container {
  display: grid;
  width: 100%;
  grid-template-rows: 5% 70% 25%;
  grid-template-columns: 100%;
  font-size: 2em;
  background: rgba(0, 0, 0, 0.32);
}
#locks-container {
  height: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
}
#word-bank-container {
  display: flex;
  flex-direction: row;
  width: 70%;
  justify-content: space-evenly;
  align-content: center;
  margin-left: 15%;
  margin-right: 15%;
}
#word-bank {
  min-width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
#score-timer {
  justify-content: space-evenly;
  width: 70%;
  margin: auto;
}
.lock {
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  border-right: 4px solid #3c3a3a;
  border-left: 4px solid #3c3a3a;
  color: #31e41c;
  height: 2em;
}
.lock.locked {
  color: #e80012 !important;
}
.lock.currentPick .lock-text {
  box-shadow: 0 0 3px 3px gold;
  z-index: 10;
  border-radius: 100px;
}
.word-bank-item {
  padding: 10px;
  user-select: none;
  font-size: 0.8em;
  text-decoration: underline;
  /* box-shadow: 0 0 1px px grey; */

  /* border-right: 1px solid grey; */
  /* border-left: 1px solid grey; */
}
.lock-text {
  transition: all 1s ease-in-out;
  padding: 5px;
}
.lock-bars {
  position: relative;
  left: 0px;
  flex-grow: 1;
  height: 15%;
  background: #3c3a3a;
  transition: all 1s ease-in-out;
}
.lock-bars.moveLeft {
  left: -50px;
}
.lock-bars.moveRight {
  left: 50px;
}
.surroundingLock {
  flex-grow: 1;
  width: 60%;
  border-right: 4px solid black;
  border-left: 4px solid black;
}
</style>

<template>
  <div id="linguisti-container">
    <div id="score-container"></div>
    <div ref="memory_board" id="memory-board">
      <div
        v-for="(tile, index) in new Array(tiles)"
        :key="`tile-${index}`"
        class="tile secondary-color-text flex-center"
        :style="iconSize"
      >
        <FlipCard
          v-if="charactersToShow.length === tiles && !correct.includes(index)"
          :backOfCard="
            charactersToShow[index].item[charactersToShow[index].native ? 0 : 1]
          "
          :rotated="rotatedItems.includes(index) || preview"
          @clicked="cardClicked(index)"
        />
        <div v-else-if="correct.includes(index)" class=""></div>
      </div>
    </div>
  </div>
</template>

<script>
import FlipCard from '@/components/games/common/FlipBox'
// import {helpers} from '../mixins/helpers.js';

import { helpers } from '@/js/helper'
export default {
  name: 'Snake',
  mixins: [helpers],
  components: {
    FlipCard
  },
  props: ['characters'],
  data () {
    return {
      tiles: 4,
      fullsnake: [],
      history: [],
      score: 0,
      isMounted: false,
      clicked: 0,
      rotatedItems: [],
      correct: [],
      board: [],
      charactersToShow: [],
      preview: false
    }
  },
  computed: {
    iconSize () {
      if (!this.isMounted) return
      return `font-size:${this.tileSide / 3}px`
    },
    tileSide () {
      if (!this.isMounted) return
      let board = this.$refs.memory_board
      let width = board.offsetWidth
      let height = board.offsetHeight
      let x = width
      let y = height
      let n = this.tiles
      let px = Math.ceil(Math.sqrt((n * x) / y))
      let sx, sy
      if (Math.floor((px * y) / x) * px < n) {
        sx = y / Math.ceil((px * y) / x)
      } else {
        sx = x / px
      }
      let py = Math.ceil(Math.sqrt((n * y) / x))
      if (Math.floor((py * x) / y) * py < n) {
        // does not fit
        sy = x / Math.ceil((x * py) / y)
      } else sy = y / py
      return Math.max(sx, sy)
    }
  },
  watch: {},
  mounted () {
    this.isMounted = true
    this.resetBoard()
  },
  methods: {
    resetBoard () {
      let board = this.$refs.memory_board
      let width = board.offsetWidth
      let height = board.offsetHeight
      let tileSize = this.tileSide
      this.resetRotated()
      let half = this.tiles / 2
      let chars = []
      this.charactersToShow = []
      this.correct = []
      this.$nextTick(() => {
        board.style.gridTemplateColumns = `repeat(${Math.floor(
          width / tileSize
        )},${tileSize}px)`
        board.style.gridTemplateRows = `repeat(${Math.floor(
          height / tileSize
        )},${tileSize}px)`
        while (chars.length !== half) {
          let random = Math.floor(Math.random() * this.characters.length)
          if (chars.includes(random)) continue
          chars.push(random)
        }
        chars = [
          ...chars.map(c => {
            return {
              item: this.characters[c],
              native: true
            }
          }),
          ...chars.map(c => {
            return {
              item: this.characters[c],
              native: false
            }
          })
        ]
        this.charactersToShow = this.shuffle(chars)
        this.preview = true
        setTimeout(() => {
          this.preview = false
        }, 3000)
      })
    },
    resetRotated () {
      this.rotatedItems = this.rotatedItems.filter(x => {
        return false
      })
    },
    cardClicked (payload) {
      let len = this.rotatedItems.length
      if (len === 2 || this.preview) return
      if (this.rotatedItems.includes(payload)) {
        this.rotatedItems = this.rotatedItems.filter(x => {
          return x !== payload
        })
        return
      }
      if (len < 2) {
        this.rotatedItems.push(payload)
      }
      if (len === 1) {
        setTimeout(() => {
          this.checkMatch()
        }, 1100)
      }
    },
    checkMatch () {
      let a = this.charactersToShow[this.rotatedItems[0]]
      let b = this.charactersToShow[this.rotatedItems[1]]
      if (a.item === b.item) {
        this.correct = [...this.correct, ...this.rotatedItems]
      }
      this.resetRotated()
      if (this.correct.length === this.charactersToShow.length) {
        if (this.characters.length >= this.tiles + 2) {
          this.tiles += 2
        }
        this.resetBoard()
      }
    },
    // endGame () {
    //   this.pause = true
    //   this.$emit('endGame', {
    //     score: this.score < 0 ? 0 : this.score,
    //     lastLetterEnglish: this.current_letter_eng,
    //     lastLetterNative: this.current_letter_foreign,
    //     history: this.history
    //   })
    // },
    fit (element, pXA, prev) {
      // let xA
      // if (prev) {
      //   element.style.fontSize = `${prev}px`
      //   // return
      // }
      // if (element.scrollWidth > element.offsetWidth) {
      //   xA = -1
      // } else {
      //   xA = 1
      // }
      // if (element.scrollHeight > element.offsetHeight) {
      //   return
      // }
      // let fontSize = element.style.fontSize
      // if (fontSize) {
      //   fontSize = parseFloat(fontSize.split('px')[0])
      // } else {
      //   fontSize = 8
      // }
      // if (!pXA || pXA === xA) {
      //   fontSize += xA
      //   element.style.fontSize = `${fontSize}px`
      //   return this.fit(element, xA)
      // }
    }
  }
}
</script>

<style scoped>
#linguisti-container {
  overflow: hidden;
  touch-action: none;
}
#memory-board {
  width: 100%;
  height: 80%;
  margin: auto;
  display: grid;
  justify-content: center;
  align-content: center;
  /* padding-bottom: 10%; */
}
#score-container {
  height: 10%;
}
.tile {
  border: 1px solid #65595994;
}
.correct-tile {
  width: 100%;
  height: 100%;
}
</style>

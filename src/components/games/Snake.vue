<template>
  <div id="linguisti-container">
    <div id="score-container">{{ score }}</div>
    <div id="snake-game-board-container" ref="snake_game_board_container">
      <div
        id="snake-game-board"
        class="primary-lightest"
        ref="snake_game_board"
      >
        <div
          v-for="(r, i) in new Array(tiles * tiles)"
          :key="`snaketile${i}`"
          ref="letters_on_board"
          :class="{
            snakehead: fullsnake[fullsnake.length - 1] === i,
            'secondary-color': fullsnake[fullsnake.length - 1] === i,
            lettersquare: Array.isArray(board[i]),
            snakebody: board[i] === 2,
            'accent-color-2': board[i] === 2,
            east: direction === 'e' && fullsnake[fullsnake.length - 1] === i,
            west: direction === 'w' && fullsnake[fullsnake.length - 1] === i,
            south: direction === 's' && fullsnake[fullsnake.length - 1] === i,
            north: direction === 'n' && fullsnake[fullsnake.length - 1] === i
          }"
          class="tile"
        >
          <div
            v-if="fullsnake[fullsnake.length - 1] === i"
            class="actualSnakeHead"
            ref="actualSnakeHead"
          >
            {{ current_letter_eng }}
          </div>
          <div v-if="Array.isArray(board[i])" class="lettersquare">
            {{ board[i][0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Snake',
  components: {},
  props: ['characters'],
  data () {
    return {
      tiles: 15,
      board: new Array(400),
      snakeHead: undefined,
      snakeTail: undefined,
      fullsnake: [],
      history: [],
      direction: 's',
      previous_direction: 's',
      letters: [],
      counter: 0,
      border_counter: 0,
      border_frames: 3,
      needs_fit: [],
      score: 0,
      xDown: null,
      yDown: null,
      pause: false
    }
  },
  computed: {
    current_letter () {
      return this.letters.length
        ? this.letters[0][0] + ' ' + this.letters[0][1]
        : undefined
    },
    current_letter_eng () {
      return this.letters.length ? this.letters[0][1] : undefined
    },
    current_letter_foreign () {
      return this.letters.length ? this.letters[0][0] : undefined
    }
  },
  watch: {},
  beforeDestroy () {
    window.removeEventListener('keyup', this.changeDirection)
    window.removeEventListener('touchmove', this.mouse)
    window.removeEventListener('touchend', this.resetMouse)
    window.removeEventListener('mousemove', this.mouse)
  },
  mounted () {
    let container = this.$refs.snake_game_board_container
    let width = container.offsetWidth
    let height = container.offsetHeight
    let min = Math.min(width, height)
    let tiles = this.tiles
    let tilesize = min / tiles

    let board = this.$refs.snake_game_board
    board.style.width = `${min}px`
    board.style.height = `${min}px`
    board.style.gridTemplateColumns = `repeat(${tiles},${tilesize}px)`
    board.style.gridTemplateRows = `repeat(${tiles},${tilesize}px)`
    this.moveSnakeHead(Math.round((tiles * tiles) / 2 + tiles / 2))
    window.addEventListener('keyup', this.changeDirection)
    window.addEventListener('touchmove', this.mouse)
    window.addEventListener('touchend', this.resetMouse)
    window.addEventListener('mousemove', this.mouse)

    this.startSnake()
  },
  methods: {
    mouse (e) {
      e.preventDefault()
      e.stopPropagation()
      if (!this.xDown && !this.yDown) {
        if (
          !(e.clientX || e.targetTouches[0].clientX) ||
          !(e.clientY || e.targetTouches[0].clientY)
        ) {
          return
        }
        this.xDown = e.clientX || e.targetTouches[0].clientX
        this.yDown = e.clientY || e.targetTouches[0].clientY
        return
      }
      var xUp = e.clientX || e.targetTouches[0].clientX
      var yUp = e.clientY || e.targetTouches[0].clientY
      var xDiff = this.xDown - xUp
      var yDiff = this.yDown - yUp
      if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 10) {
        /* most significant */
        if (xDiff > 0) {
          this.changeDirection({ key: 'ArrowLeft' })
        } else {
          this.changeDirection({ key: 'ArrowRight' })
        }
        this.resetMouse()
      } else if (Math.abs(yDiff) > 10) {
        if (yDiff > 0) {
          this.changeDirection({ key: 'ArrowUp' })
        } else {
          this.changeDirection({ key: 'ArrowDown' })
        }
        this.resetMouse()
      }
    },
    resetMouse () {
      this.xDown = null
      this.yDown = null
    },
    changeDirection (e) {
      if (e.key === 'ArrowRight' && this.previous_direction !== 'w') {
        this.direction = 'e'
      } else if (e.key === 'ArrowLeft' && this.previous_direction !== 'e') {
        this.direction = 'w'
      } else if (e.key === 'ArrowUp' && this.previous_direction !== 's') {
        this.direction = 'n'
      } else if (e.key === 'ArrowDown' && this.previous_direction !== 'n') {
        this.direction = 's'
      }
    },
    endGame () {
      this.pause = true
      this.$emit('endGame', {
        score: this.score < 0 ? 0 : this.score,
        lastLetterEnglish: this.current_letter_eng,
        lastLetterNative: this.current_letter_foreign,
        history: this.history
      })
    },
    startSnake (b) {
      if (this.pause) return
      this.counter++
      if (this.counter > 10) {
        this.addLetter()
        this.counter = 0
      }
      setTimeout(() => {
        if (this.pause) return
        let current = this.fullsnake[this.fullsnake.length - 1]
        let nextIndex = current
        let tiles = this.tiles
        if (this.direction === 'e') {
          if (current % tiles === tiles - 1) {
            if (b) {
              this.endGame()
              return
            } else {
              this.startSnake(true)
              return
            }
          }
          nextIndex++
        } else if (this.direction === 'w') {
          if (current % tiles === 0) {
            if (b) {
              this.endGame()
              return
            } else {
              this.startSnake(true)
              return
            }
          }
          nextIndex--
        } else if (this.direction === 'n') {
          nextIndex -= tiles
          if (nextIndex < 0) {
            if (b) {
              this.endGame()
              return
            } else {
              this.startSnake(true)
              return
            }
          }
        } else if (this.direction === 's') {
          nextIndex += tiles
          if (nextIndex >= tiles * tiles) {
            if (b) {
              this.endGame()
              return
            } else {
              this.startSnake(true)
              return
            }
          }
        }
        this.previous_direction = this.direction
        this.moveSnakeHead(nextIndex)
        this.startSnake()
      }, 200)
    },
    moveSnakeHead (pos) {
      if (this.border_counter === 0) {
        if (!this.$refs.snake_game_board) return
        this.$refs.snake_game_board.classList.remove('border-glow-green')
        this.$refs.snake_game_board.classList.remove('border-glow-red')
      } else if (this.border_counter > 0) {
        this.border_counter--
      }
      let newle
      let removed
      if (this.fullsnake.length > 0) {
        removed = this.fullsnake.shift()
      }
      this.$set(this.board, removed, undefined)
      this.$set(this.fullsnake, this.fullsnake.length, pos)
      let head = pos
      let prevHead =
        this.fullsnake.length === 1
          ? removed
          : this.fullsnake[this.fullsnake.length - 2]
      let val
      if (prevHead >= 0) {
        if (this.fullsnake.length > 1) {
          val = 2
        }
        this.$set(this.board, prevHead, val)
      }

      let nextSpot = this.board[head]
      if (nextSpot) {
        if (nextSpot === 2) {
          // HIT TAIL
          this.endGame()
          return
        }
        if (this.letters[0] === nextSpot) {
          this.letterCollected(true, this.letters[0])
          this.$refs.snake_game_board.classList.remove('border-glow-red')
          this.$refs.snake_game_board.classList.add('border-glow-green')
          this.border_counter = this.border_frames
          this.$set(this.board, removed, 2)
          this.fullsnake.unshift(removed)
          this.$delete(this.letters, 0)
          newle = true
        } else {
          this.letterCollected(false, nextSpot)
          this.$refs.snake_game_board.classList.remove('border-glow-green')
          this.$refs.snake_game_board.classList.add('border-glow-red')
          this.border_counter = this.border_frames
          if (this.fullsnake.length === 1) {
            // TOO MANY WRONG ANSWERS
            this.endGame()
            return
          }
          let removed2 = this.fullsnake.shift()
          this.$set(this.board, removed2, undefined)
          let index = this.letters.indexOf(nextSpot)
          this.$delete(this.letters, index)
        }
      }
      let prevSize =
        newle || !this.current_letter
          ? undefined
          : this.$refs.actualSnakeHead[0].style.fontSize.split('px')[0]

      this.$set(this.board, head, 1)
      this.$nextTick(() => {
        if (!this.current_letter) return
        this.fit(this.$refs.actualSnakeHead[0], undefined, prevSize)
      })
    },
    letterCollected (bool, letter) {
      this.history.push({
        ...letter,
        correct: bool
      })
      this.score += bool ? 1 : -1
    },
    addLetter () {
      // Add Letter To Letters Array
      let random = Math.floor(Math.random() * this.characters.length)
      this.$set(this.letters, this.letters.length, this.characters[random])
      // Find Position To Add Letter Onto Board - Must meet certain criteria
      let position = this.findAvailableRanomPosition()
      this.$set(this.board, position, this.characters[random])
      this.$nextTick(() => {
        if (!this.$refs.letters_on_board[position]) return
        this.fit(this.$refs.letters_on_board[position].children[0])
      })
    },
    fit (element, pXA, prev) {
      let xA
      if (prev) {
        element.style.fontSize = `${prev}px`
        // return
      }
      if (element.scrollWidth > element.offsetWidth) {
        xA = -1
      } else {
        xA = 1
      }
      if (element.scrollHeight > element.offsetHeight) {
        return
      }
      let fontSize = element.style.fontSize
      if (fontSize) {
        fontSize = parseFloat(fontSize.split('px')[0])
      } else {
        fontSize = 8
      }
      if (!pXA || pXA === xA) {
        fontSize += xA
        element.style.fontSize = `${fontSize}px`
        return this.fit(element, xA)
      }
    },
    findAvailableRanomPosition () {
      let random = Math.floor(Math.random() * this.tiles * this.tiles)
      while (!this.checkBoardPosition(random)) {
        random = Math.floor(Math.random() * this.tiles * this.tiles)
      }
      return random
    },
    checkBoardPosition (ind) {
      // If the spot is already occupied, return false.
      if (this.board[ind]) {
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
#linguisti-container {
  width: 100vw;
  overflow: hidden;
  /* position: fixed;
  top: 0; */
  touch-action: none;
}
#snake-game-board-container {
  width: 95%;
  height: 80vh;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#snake-game-board {
  display: grid;
  border: 1px solid black;
  /* box-shadow: 10px 10px 10px #ff2457; */
}
.snakehead.east {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.snakehead.west {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.snakehead.north {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.snakehead.south {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.snakehead {
  width: 100%;
  height: 100%;
  display: inline-block;
  white-space: nowrap;
  font-weight: bolder;
}
.snakebody {
  width: 100%;
  height: 100%;
}
.border-glow-red {
  border: 3px solid #ff2457;
  outline: none;
  border-color: #ff2457;
  box-shadow: 0 0 50px 15px #ff2457;
  border-radius: 7px;
}
.border-glow-green {
  border: 3px solid #00ff54;
  outline: none;
  border-color: #00ff54;
  box-shadow: 0 0 50px 15px #00ff54;
  border-radius: 7px;
}
.letter-container {
  height: 50px;
  width: 80px;
  font-size: 30px;
}
#letter-prompt-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.lettersquare {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  height: 100%;
  letter-spacing: -2px;
  font-weight: bolder;
  font-size: 8px;
  background-color: #f9fbfb;
  color: #3a4a4d;
  /* border:1px solid grey; */
}
.tile {
  /* font-size: 2em; */
  /* line-height: 1em; */
}
.actualSnakeHead {
  height: 100%;
  width: 100%;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#score-container {
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  font-size: 3em;
}
</style>

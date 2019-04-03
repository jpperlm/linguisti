<template>
  <div id="flipCard" class="flip-card" @click="$emit('clicked')">
    <div class="flip-card-inner" :class="{ rotated: rotated }">
      <div class="flip-card-front flex-center" :style="backgroundImage">
        <font-awesome-icon
          class="question-icon"
          :icon="['far', 'question-circle']"
        />
      </div>
      <div class="flip-card-back flex-center">
        <div ref="card" class="back-text flex-center">{{ backOfCard }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { helpers } from '@/js/helper'

export default {
  name: 'FlipBox',
  mixins: [helpers],
  components: {},
  props: ['backOfCard', 'rotated'],
  data () {
    return {
      fontSize: 10,
      texture: 'curls.png'
    }
  },
  computed: {
    backgroundImage () {
      let x = `static/textures//${this.texture}`
      let rObj = {
        backgroundImage: `url(${x})`,
        'background-size': 'cover'
      }
      return rObj
    }
  },
  watch: {},
  mounted () {
    this.fontSize = this.fit({
      element: this.$refs.card,
      fontSize: this.fontSize
    })
  },
  methods: {}
}
</script>
<style scoped>
#flipCard {
  width: 100%;
  height: 100%;
  /* box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2); */
}
/* #flipCard:hover {
  box-shadow: 0 0 2rem #02c3bd;
} */
.flip-card {
  /* background-color: transparent; */

  /* border: 5px solid #f1f1f1; */
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */

.rotated {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  backface-visibility: hidden;
  white-space: nowrap;
  background-color: #272d2d;
  height: 100%;
  width: 100%;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
}
/* Style the back side */
.flip-card-back {
  color: white;
  transform: rotateY(180deg);
}
.back-text {
  width: 70%;
  height: 90%;
  margin: auto;
}
</style>

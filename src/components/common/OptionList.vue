<template>
  <div id="list-container">
    <div
      class="list-item primary-lighter"
      v-for="(item, index) in slicedOptions"
      :key="`${item.key}_${index}`"
      v-on:click="optionClicked(item, index)"
      ref="listoptions"
    >
      <div class="list-label-container">
        <div class="list-label-main">
          {{ item[keyMap['main']] || item.keyMap['alternative'] }}
        </div>
        <div class="list-label-sub">
          {{ item[keyMap['sub']] }}
        </div>
      </div>
      <div class="list-image-container">
        <img
          v-if="item.img"
          class="image"
          :src="require(`@/assets/${item.img}`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Games',
  mounted () {},
  props: ['showMax', 'list', 'keyMap', 'color'],
  methods: {
    optionClicked (item, index) {
      if (this.stopSelect) return
      this.stopSelect = true
      this.$refs.listoptions[index].classList.remove('primary-lighter')
      this.$refs.listoptions[index].classList.add('accent-color-2')
      setTimeout(() => {
        let payload = {
          item,
          index
        }
        this.$emit('optionSelected', payload)
      }, 500)
    }
  },
  computed: {
    slicedOptions () {
      return this.list.slice(this.startIndex, this.showMax || 6)
    }
  },
  data () {
    return {
      startIndex: 0,
      stopSelect: false
    }
  }
}
</script>

<style scoped>
#list-container {
  width: 100%;
}
.list-item {
  width: 100%;
  height: 8vh;
  /* border-top: 1px solid #ff2457; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  border-radius: 5px;
  margin-bottom: 5px;
}
.list-item:last-child {
  /* border-bottom: 1px solid #ff2457; */
}
.list-item:hover {
  cursor: pointer;
  background: #392e5c;
  color: #e80012;
  /* font-style: italic; */
}
.list-label-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
}
.list-label-main {
  font-size: 1.3em;
  margin-left: 15%;
}
.list-label-sub {
  font-style: italic;
  margin-left: 20%;
}
.list-image-container {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image {
  height: 5vh;
  width: 7vh;
  box-shadow: 0 0 5px 3px #00cde8;
  /* box-shadow: 10px 10px 6px #e80012; */
  border-radius: 3px;
}
/* .list-btn.toggleon {
  background: #21ef08;
} */

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

<template>
  <div id="list-container">
    <div
      class="list-item"
      v-for="(item, index) in slicedOptions"
      :key="item.key"
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
        <img class="image" :src="require(`@/assets/${item.img}`)" />
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
      this.$refs.listoptions[index].style.background = this.color
      setTimeout(() => {
        let payload = {
          item,
          index
        }
        this.$emit('optionSelected', payload)
      }, 700)
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
  height: 10vh;
  border-top: 1px solid #e4d7d7;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
}
.list-item:last-child {
  border-bottom: 1px solid #e4d7d7;
}
.list-item:hover {
  cursor: pointer;
  background: #24ffff;
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
  height: 5.5vh;
  width: 8vh;
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

<template>
  <div id="loading">
    <div ref="apptitle" id="apptitle" class="slowtransition">
      Linguisti
    </div>
    <div ref="appauthor" id="appauthor" class="slowtransition">
      PerlmanLabs
    </div>
  </div>
</template>

<script>
export default {
  name: 'Splash',
  mounted () {
    setTimeout(() => {
      this.$router.push({ name: 'Splash' })
    }, 1000)
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
#loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
#apptitle {
  font-size: 2em;
  margin-bottom: 20px;
}
#appauthor {
  font-size: 1.2em;
}

.slowtransition {
  transition: all 1s ease-in-out;
}
</style>

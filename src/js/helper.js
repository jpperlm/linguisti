export const helpers = {
  methods: {
    shuffle (arr) {
      let array = arr
      let counter = array.length
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter)
        // Decrease counter by 1
        counter--
        // And swap the last element with it
        let temp = array[counter]
        array[counter] = array[index]
        array[index] = temp
      }
      return array
    },
    quick_fit (args) {
      let element = args.element
      let size = args.size
      let container = args.container
      let useMe = args.useMe
      if (useMe) {
        element.style.fontSize = useMe + 'em'
        return useMe
      }
      let larger = Math.max(element.offsetWidth, element.offsetHeight)
      let ratio = (size || container.offsetWidth) / (larger * 1.1)
      element.style.fontSize = ratio + 'em'
      return ratio
    },
    fit (args) {
      if (!args.count) {
        args.count = 0
      }
      const { element, pXA, prev, fontSize, count } = args
      if (count > 100) return
      let xA
      if (prev) {
        element.style.fSize = `${prev}px`
        // return
      }
      if (element.scrollWidth > element.offsetWidth) {
        xA = -3
      } else {
        xA = 3
      }
      if (element.scrollHeight > element.offsetHeight) {
        return fontSize
      }
      let fSize = element.style.fontSize

      if (fSize) {
        fSize = parseFloat(fSize.split('px')[0])
      } else {
        fSize = fontSize || 8
        xA = 3
      }
      if (!pXA || pXA === xA) {
        fSize += xA
        element.style.fontSize = `${fSize}px`
        return this.fit({ element, pxA: xA, fontSize: fSize, count: count + 1 })
      }
      return fSize
    },
    randomLetterIndex () {
      return Math.floor(Math.random() * this.characters.length)
    }
  }
}

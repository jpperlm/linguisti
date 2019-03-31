export default {
  games: [
    {
      key: 'typing',
      label: 'Keyboard',
      sub: '(Speed Typing)',
      img: 'keyboard.png',
      allowFor: ['all']
    },
    {
      key: 'snake',
      label: 'Snake',
      sub: '(hisssss)',
      img: 'snake.png',
      allowFor: ['alphabet']
    },
    {
      key: 'memoryflip',
      label: 'Memory Tiles',
      sub: '(flip pairs)',
      img: '',
      allowFor: ['all']
      // exclude: ['alphabet']
    }
  ],
  game: undefined
}

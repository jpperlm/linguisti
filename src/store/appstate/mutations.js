/*
export function someMutation (state) {
}
*/
// export const updateMessage = (state, payload) => {
//   state.nav_message = payload
// }
// export const updateActiveLetters = (state, payload) => {
//   state.active_letters = payload
// }
export const toggleSidebar = state => {
  state.showSidebar = !state.showSidebar
}
export const hideSidebar = state => {
  state.showSidebar = false
}
export const showSidebar = state => {
  state.showSidebar = true
}

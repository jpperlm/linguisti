export const toggleSidebar = ({ commit, state }, payload) => {
  if (payload === false) {
    commit('hideSidebar')
  }
}

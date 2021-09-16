interface State {
  isMenuOpen: boolean
}

export const state = (): State => ({
  isMenuOpen: false,
})

export const getters = {
  isMenuOpen: (state: State) => state.isMenuOpen,
}

export const mutations = {
  openMenu(state: State) {
    state.isMenuOpen = true
  },

  closeMenu(state: State) {
    state.isMenuOpen = false
  },

  toggleMenu(state: State) {
    state.isMenuOpen = !state.isMenuOpen
  },
}

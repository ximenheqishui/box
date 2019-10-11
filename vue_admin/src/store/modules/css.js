const css = {
  namespaced: true,
  state: {
    aside: {
      isCollapse: false
    }
  },
  mutations: {
    setCollapse: (state, tag) => {
      state.aside.isCollapse = tag
    }
  },
  actions: {
    // 设置左边导航栏
    changeCollapse ({ commit, state }) {
      if (state.aside.isCollapse) {
        commit('setCollapse', false)
      } else {
        commit('setCollapse', true)
      }
    }
  }
}
export default css

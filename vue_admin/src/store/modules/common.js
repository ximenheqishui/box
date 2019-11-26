const common = {
  namespaced: true,
  state: {
    refresh: false // 新页面是否需要刷新
  },
  mutations: {
    setRefresh: (state, tag) => {
      state.refresh = tag
    }
  },
  actions: {
    changeRefresh ({ commit, state }, tag) {
      commit('setRefresh', tag)
    }
  }
}
export default common

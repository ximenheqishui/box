const user = {
  state: {
    count: 0, // 接口点击次数
    total: 0 // 总访问量
  },
  mutations: {
    increment: (state, data) => {
      console.log(data.num)
      state.count++
    },
    setTotal: (state, total) => {
      state.total = total
    }
  },
  actions: {
    // 获取总访问量发起一个ajax就可以了
    getTotal ({ commit, state }, data) {
      commit('setTotal', data.num)
      console.log(data.num)
      new Promise((resolve, reject) => {
        let a = 0
        console.log(a)
        let c = 1 / 0
        let b = 0 / d
      }).then(res => {
        // 成功
        resolve(res)
      }, err => {
        // 失败
        reject(err)
      })
    }
  }
}
export default user

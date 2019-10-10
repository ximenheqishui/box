import api from '@/api/index.js'
const common = {
  state: {
    areaTree: [],
    station: []
  },
  mutations: {
    setAreaTree: (state, areaTree) => {
      state.areaTree = areaTree
    },
    setStation: (state, station) => {
      state.station = station
    }
  },
  actions: {
    // 获取区域
    getAreaTree ({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.getAreaTree({}).then(res => {
          if (res.code === 0) {
            console.log(res.data.list)
            commit('setAreaTree', res.data.list)
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(error => { // 状态码非2xx时
          reject(error)
        })
      })
    },
    // 获取区域
    getStation ({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.getStation({}).then(res => {
          if (res.code === 0) {
            console.log(res.data.list)
            commit('setStation', res.data.list)
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(error => { // 状态码非2xx时
          reject(error)
        })
      })
    }
  }
}
export default common

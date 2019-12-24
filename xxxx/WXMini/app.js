App({
  onLaunch: function (options) {
  },
  onShow: function () {
    if (!this.globalData.socketTask && this.globalData.room) {
      console.log('显示初始化')
      this.initSocket(this.globalData.room)
    }
  },
  getOpenID (cb) {
    let _this = this
    if (_this.globalData.openid) {
      typeof cb == "function" && cb({
        openid:_this.globalData.openid,
        session_key:_this.globalData.openid
      })
    } else {
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'http://192.168.199.147:3000/weixin-xcx/login',
              data: {
                code: res.code
              },
              success(res) {
                _this.globalData.openid =res.data.openid
                _this.globalData.session_key =res.data.session_key
                typeof cb == "function" && cb({
                  openid:_this.globalData.openid,
                  session_key:_this.globalData.openid
                })
              },
              fail (error) {
                console.log(error)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },

  addMessage (message,type) {
    if (type) {
      this.globalData.allMessage = message
    } else {
      this.globalData.allMessage.push(message)
    }
    let arr = getCurrentPages()
    let currentPage = arr[arr.length - 1]
    console.log(currentPage.name)
    if (currentPage.name === 'videoText') {
      if (!type) {
        this.globalData.unreadMessage++
        currentPage.setData({
          unreadMessage: this.globalData.unreadMessage
        })
      }
    } else if (currentPage.name === 'roomText') {
      currentPage.setData({
        allData: this.globalData.allMessage
      })
      currentPage.setInfoScroll()
    } else {
      if (!type) {
        this.globalData.unreadMessage++
      }
    }

  },

  initSocket (room) {
    let _this = this
    // 这些代码应该 放到app中的   里面加上初始化和关闭功能
    _this.globalData.room = room
    if (!_this.globalData.socketTask) {
      _this.globalData.socketTask = wx.connectSocket({url: 'ws://192.168.199.147:3000'})

      _this.globalData.socketTask.onClose(function (){
        _this.globalData.socketTask = null
      })

      _this.globalData.socketTask.onOpen(function (){
        _this.globalData.socketTask.send({
          data:JSON.stringify({
            type: 'join_room',
            data:{
              room: room,
              userInfo: _this.globalData.userInfo,
            }
          }),
          success: function(res){
            console.log(res)
          }
        })
      })

      _this.globalData.socketTask.onMessage(function (message) {
        let data = JSON.parse(message.data)
        console.log(data)
        switch (data.type) {
          case 'inti':
            _this.globalData.socketTask.client_id = data.client_id
            console.log(_this.globalData.socketTask)
            break
          case 'join_room':
            console.log(data.data.userInfo.nickName + '加入房间')
            break
          case 'all_message':
            _this.addMessage(data.data,1)
            break
          case 'message':
            console.log('来了一条新消息')
            _this.addMessage(data.data)
            break
        }
      })
    }
  },

  closeSocket () {
    if (this.globalData.socketTask) {
      this.globalData.socketTask.close()
      this.globalData.socketTask = null
    }
    this.globalData.room = ''
  },

  globalData: {
    room: '',
    openid: '',
    session_key: '',
    userInfo: null,
    socketTask: null,
    unreadMessage: 0,
    allMessage: []
  }
})

<template>
  <div class="room-text">
    <div class="open-message" @click="drawer = true">
      <div>聊天<span>0</span></div>
    </div>
    <el-drawer
      title="聊天窗口"
      size="500px"
      :visible.sync="drawer"
      direction="rtl">
      <div class="scroll-view">
        <div class="content-box" v-for="item in allMessage" :key="item.id">
          <div class="center"> {{ item.create_time }}</div>
          <div class="right" v-if="item.user_id == $store.getters.userInfo.id">
            <div class="item text" v-if="item.code == 1">
              <span>{{ item.text }}</span>
            </div>
            <div bindtap="showBigImage(item)" class="item image" v-else-if="item.code == 2">
              <el-image
                :src="item.text"
                fit="fit">
              </el-image>
            </div>
            <a :href="item.text" target="_blank" class="item file" v-else>
              <div class="file-info">
                <div class="name">
                  <span>{{item.file_name}}</span>
                </div>
                <div class="size">
                  <span>{{item.file_size}}</span>
                </div>
              </div>
              <el-image
                :src="'./static/img/'+ item.code + 'file.png'"
                fit="fit">
              </el-image>
            </a>
            <div class="avatar">
              <el-image
                style="width: 38px;height: 38px;border-radius: 4px"
                :src="item.avatar"
                fit="fit">
              </el-image>
            </div>
          </div>
          <div class="left" v-else>
            <div class="avatar">
              <el-image
                style="width: 38px;height: 38px;border-radius: 4px"
                :src="item.avatar"
                fit="fit">
              </el-image>
            </div>
            <div class="item text" v-if="item.code == 1">
              <span>{{ item.text }}</span>
            </div>
            <div bindtap="showBigImage(item)" class="item image" v-else-if="item.code == 2">
              <el-image
                :src="item.text"
                fit="fit">
              </el-image>
            </div>
            <a :href="item.text" target="_blank" class="item file" v-else>
              <div class="file-info">
                <div class="name">
                  <span>{{item.file_name}}</span>
                </div>
                <div class="size">
                  <span>{{item.file_size}}</span>
                </div>
              </div>
              <el-image
                :src="'./static/img/'+ item.code + 'file.png'"
                fit="fit">
              </el-image>
            </a>
          </div>
        </div>
      </div>
      <div class="send-message">
        <div class="tool-box">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-folder"></i>
          </el-upload>
        </div>
        <div class="input">
          <el-input
            @keyup.enter.native="sendMessage"
            type="textarea"
            :rows="4"
            v-model="textarea">
          </el-input>
        </div>
        <div class="send">
          <el-button size="mini" @click="sendMessage">发送</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'room-text',
    components: {},
    data () {
      return {
        uploadUrl: this.api.commonURL.uploadUrl,
        room: '',
        socketTask: null,
        drawer: false,
        textarea: '',
        allMessage: [],
        canSend: true
      }
    },
    methods: {
      sendMessage () {
        if (this.canSend) {
          this.canSend = false
          this.api.sendMessage({
            code: 1, // 普通文本
            text: this.textarea,
            group_id: this.room,
            avatar: this.$store.getters.userInfo.avatar, // 当前用户的头像
            user_id: this.$store.getters.userInfo.id, // 当前用户的id
            create_time: new Date()
          })
          this.textarea = ''
          setTimeout(() => {
            this.canSend = true
          }, 1000)
        }
      },
      initSocket (room) {
        let _this = this
        // 这些代码应该 放到app中的   里面加上初始化和关闭功能
        _this.room = room
        if (!_this.socketTask) {
          _this.socketTask = new WebSocket('wss://chat.xee.link:8282')
          console.log(_this.socketTask)
          _this.socketTask.onclose = function () {
            _this.socketTask = null
          }
          _this.socketTask.onmessage = function (message) {
            console.log(message)
            let data = JSON.parse(message.data)
            console.log(data)
            switch (data.type) {
            case 'init':
              _this.socketTask.client_id = data.client_id
              console.log(_this.socketTask)
              _this.api.bindId({
                client_id: data.client_id,
                user_id: _this.openid,
                group_id: room
              })
              _this.api.loadAll({
                group_id: room
              }).then(res => {
                _this.addMessage(res.data, 1)
              })
              break
            case 'message':
              console.log('来了一条新消息')
              _this.addMessage(data.data)
              break
            }
          }
        }
      },
      addMessage (message, type) {
        if (type) {
          this.allMessage = message
        } else {
          this.allMessage.push(message)
        }
        if ($('.scroll-view').length) {
          this.$nextTick(() => {
            $('.scroll-view').animate({ scrollTop: $('.scroll-view')[0].scrollHeight + 1000 }, 500)
          })
        }
        // var ele = document.getElementById('id')
        // ele.scrollTop = ele.scrollHeight
        if (!type && this.$store.getters.userInfo.id !== message.user_id) {
          // wx.playBackgroundAudio({
          //   dataUrl: 'https://chat.xee.link/static/audio/msnaudio.mp3'
          // })
        }
      },
      // 图片上传成功后的操作
      handleAvatarSuccess (res, file) {
        // 这里加一个后台返回连接的
        // this.dialog.form.avatar = URL.createObjectURL(file.raw)
        console.log(123, res)
        let arr = res.data.path.split('.')
        let lastName = arr[arr.length - 1].toUpperCase()
        let code = ''
        switch (lastName) {
        case 'PNG':
        case 'JPG':
        case 'JPEG':
        case 'WEBP':
        case 'SVG':
          code = 2
          break
        case 'PDF':
          code = 3
          break
        case 'DOC':
        case 'DOCX':
          code = 4
          break
        case 'XLS':
        case 'XLSX':
          code = 5
          break
        case 'PPTX':
        case 'PPT':
          code = 6
          break
        default:
          code = 99
          break
        }
        this.api.sendMessage({
          code: code, // 普通文本
          text: res.path,
          group_id: this.room,
          avatar: this.$store.getters.userInfo.avatar, // 当前用户的头像
          user_id: this.$store.getters.userInfo.id, // 当前用户的id
          file_name: res.data.original_name,
          file_size: sizeFormat(res.data.size),
          create_time: new Date()
        })

        function sizeFormat (size) {
          size = size / 1024
          if (size) {
            if (size > 102) {
              return (size / 1024).toFixed(2) + 'mb'
            } else {
              return size.toFixed(2) + 'kb'
            }
          } else {
            return '0kb'
          }
        }
      },
      // 图片上传之前的校验
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          this.$message.error('小于10MB!')
        }
        return isLt2M
      }
    },
    mounted: function () {
    }
  }
</script>

<style lang="scss" type="text/scss">
  .room-text {
    .open-message{
      position: fixed;
      cursor: pointer;
      bottom: 0px;
      width: 80px;
      right:0px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      box-sizing: border-box;
      border-radius: 40px 0 0 40px;
      background: #3A71A8;
      color: #fff;
    }
    .el-drawer__body {
      display: flex;
      flex-flow: nowrap column;
      box-sizing: border-box;

      .scroll-view {
        box-sizing: border-box;
        height: 0;
        flex: auto;
        width: 100%;
        background: #f5f5f5;
        overflow-x: hidden;
        overflow-y: auto;

        .content-box {
          padding: 10px;

          .center {
            text-align: center;
            font-size: 12px;
            color: #333;
            margin-bottom: 4px;
          }

          .right {
            display: flex;
            flex-flow: nowrap row;
            justify-content: flex-end;

            .file .file-info {
              margin-right: 10px;
            }

            .image {
              text-align: right;
            }
          }

          .left {
            display: flex;
            flex-flow: nowrap row;

            .file .file-info {
              margin-left: 10px;
            }
          }

          .item {
            box-sizing: border-box;
            width: 70%;
            border-radius: 4px;
            position: relative;

            &:before {
              content: ' ';
              width: 10px;
              height: 10px;
              background-color: #fff;
              transform: rotate(45deg);
              position: absolute;
              top: 14px
            }
          }

          .right .item {
            margin-right: 10px;

            &:before {
              right: -5px;
            }
          }

          .left .item {
            margin-left: 10px;

            &:before {
              left: -5px;
            }
          }

          .text {
            padding: 8px;
            background-color: #94ed6a;
            font-size: 14px;
            color: #000;
            line-height: 22px;
            word-break: break-all;

            &:before {
              background-color: #94ed6a;
            }
          }

          .image {
            img {
              max-width: 100%;
              border-radius: 4px;
            }

            &:before {
              width: 0;
              height: 0;
            }
          }

          .file {
            padding: 8px;
            background-color: #fff;
            box-sizing: border-box;
            height: 70px;
            display: flex;
            width: 60%;
            justify-content: space-between;
            align-items: center;

            .file-info {
              flex: auto;
              width: 0;

              .name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 18px;
                color: #000;
              }

              .size {
                font-size: 14px;
                color: #333;
                text-transform: uppercase;
              }
            }

            img {
              width: 38px;
              height: 54px;
              flex: none;
            }
          }
        }

        .avatar {
          height: 38px;
        }
      }

      .send-message {
        box-sizing: border-box;
        flex: none;
        height: 210px;
        width: 100%;
        background-color: #fff;
        padding: 20px 40px;

        .tool-box {
          font-size: 26px;
          color: #7c7c7c;
        }

        .send {
          margin-top: 10px;
          text-align: right;
        }
      }
    }
  }
</style>

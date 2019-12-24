const app = getApp()

Page({
    name: 'roomText',
    /**
     * 页面的初始数据
     */
    data: {
        top: 10000,
        id: '',
        inputValue: '',
        bigImageUrl: '',
        showBigImageTag: false,
        tool: false,
        devicePosition: 'back',
        showCamera: false,
        src: '',
        allData: [
        //     {
        //     id: '1',
        //     code: 1, // 普通文本
        //     avatar: 'http://192.168.199.147:3000/upload/images/1570447104633-20180526235844_vnmun.jpeg',
        //     text: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好32132323213213213232321321asdsadsadsadsdasdasdsadsadasdsadsad',
        //     user_id: '123',
        //     create_time: '2019-12-16 9:55:33'
        // },
        //     {
        //         id: '2',
        //         code: 2, // 图片
        //         avatar: 'http://192.168.199.147:3000/upload/images/1570447104633-20180526235844_vnmun.jpeg',
        //         text: 'http://192.168.199.147:3000/upload/images/1565076969166-idcordzheng.jpg',
        //         user_id: '123',
        //         create_time: '2019-12-16 9:55:33'
        //     },
        //     {
        //         id: '3',
        //         code: 3, // pdf
        //         avatar: 'http://192.168.199.147:3000/upload/images/1570447104633-20180526235844_vnmun.jpeg',
        //         text: 'http://192.168.199.147:3000/upload/小说欣赏.pdf',
        //         user_id: '123',
        //         file_name: '小说欣赏.pdf',
        //         file_size: '120kb',
        //         create_time: '2019-12-16 9:55:33'
        //     },
        //     {
        //         id: '4',
        //         code: 4, // word文档
        //         avatar: 'http://192.168.199.147:3000/upload/images/1570447104633-20180526235844_vnmun.jpeg',
        //         text: 'http://192.168.199.147:3000/upload/小说欣赏.doc',
        //         user_id: '123',
        //         file_name: '小说欣赏.doc',
        //         file_size: '120kb',
        //         create_time: '2019-12-16 9:55:33'
        //     },
        //     {
        //         id: '5',
        //         code: 5, // 表格
        //         avatar: 'http://192.168.199.147:3000/upload/images/1570447104633-20180526235844_vnmun.jpeg',
        //         text: 'http://192.168.199.147:3000/upload/晓说.xlsx',
        //         user_id: '123',
        //         file_name: '晓说.xlsx',
        //         file_size: '120kb',
        //         create_time: '2019-12-16 9:55:33'
        //     },
        //     {
        //         id: '1',
        //         code: 1, // 普通文本
        //         text: '你好',
        //         user_id: '3445',
        //         avatar: 'http://192.168.199.147:3000/upload/images/1565076969166-idcordzheng.jpg',
        //         create_time: '2019-12-16 9:55:33'
        //     },
        //     {
        //         id: '2',
        //         code: 2, // 图片
        //         avatar: 'http://192.168.199.147:3000/upload/images/1565076969166-idcordzheng.jpg',
        //         text: 'http://192.168.199.147:3000/upload/images/1565076969166-idcordzheng.jpg',
        //         user_id: '3445',
        //         create_time: '2019-12-16 9:55:33'
        //     },
        //     {
        //         id: '3',
        //         code: 3, // pdf
        //         avatar: 'http://192.168.199.147:3000/upload/images/1565076969166-idcordzheng.jpg',
        //         text: 'http://192.168.199.147:3000/upload/images/1565076969166-idcordzheng.jpg',
        //         user_id: '3445',
        //         create_time: '2019-12-16 9:55:33'
        //     },
        //     {
        //         id: '4',
        //         code: 4, // word文档
        //         avatar: 'http://192.168.199.147:3000/upload/images/1565076969166-idcordzheng.jpg',
        //         text: 'http://192.168.199.147:3000/upload/images/1565076969166-idcordzheng.jpg',
        //         user_id: '3445',
        //         create_time: '2019-12-16 9:55:33'
        //     },
        //     {
        //         id: '5',
        //         code: 5, // 表格
        //         avatar: 'http://192.168.199.147:3000/upload/images/1565076969166-idcordzheng.jpg',
        //         text: 'http://192.168.199.147:3000/upload/images/1565076969166-idcordzheng.jpg',
        //         user_id: '3445',
        //         create_time: '2019-12-16 9:55:33'
        //     },
        ]
    },

    keyboardheightchange (event) {

    },

    // 输入框文字设置
    bindReplaceInput (e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    sendMessage () {
        this.socketSendMessage({
            room: app.globalData.room,
            code: 1, // 普通文本
            text: this.data.inputValue,
            avatar: app.globalData.userInfo.avatarUrl, // 当前用户的头像
            user_id: app.globalData.openid, // 当前用户的id
            create_time: new Date()
        })
        this.setData({
            inputValue: ''
        })
    },
    // 显示工具栏
    showTool: function () {
        console.log(11)
        this.setData({
            tool: true
        })
    },
    hideTool: function () {
        console.log(22)
        this.setData({
            tool: false
        })
    },
    // 相册中选择图片
    chooseImage: function () {
        let _this = this
        wx.chooseImage({
            count: 1,
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                _this.uploadFile(tempFilePaths[0])
            }
        })
    },

    //
    uploadFile(path,name) {
        let _this = this
        wx.uploadFile({
            url: 'http://192.168.199.147:3000/common/upload/single',
            filePath: path,
            name: 'file',
            success(res) {
                const data = res.data
                let jsondata = JSON.parse(data)
                let arr  = jsondata.path.split('.')
                let lastName = arr[arr.length - 1].toUpperCase()
                let code = ''
                switch (lastName) {
                    case 'PNG':
                    case 'JPG':
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

                _this.socketSendMessage({
                    room: app.globalData.room,
                    code: code, // 普通文本
                    text: jsondata.path,
                    avatar: app.globalData.userInfo.avatarUrl, // 当前用户的头像
                    user_id: app.globalData.openid, // 当前用户的id
                    file_name: name || jsondata.file.filename ,
                    file_size: jsondata.file.size,
                    create_time: new Date()
                })
                _this.setData({
                    tool: false
                })
            },
            fail(error) {
                console.log(error)
            }
        })
    },

    socketSendMessage(data){
        app.globalData.socketTask.send({
            data: JSON.stringify({
                type: 'message',
                data: data
            })
        })
    },
    // 显示相机
    showCamera() {
        this.setData({
            showCamera: true
        })
    },
    hideCamera() {
        this.setData({
            showCamera: false
        })
    },
    // 切换相机镜头
    changeCamera() {
        console.log('devicePosition')
        let aa = 'front'
        if (this.data.devicePosition === 'front') {
            aa = 'back'
        }
        this.setData({
            devicePosition: aa
        })
    },
    // 拍照
    takePhoto() {
        let _this = this
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                this.setData({
                    showCamera: false
                })
                _this.uploadFile(res.tempImagePath)
            }
        })
    },
    error(e) {
        console.log(e.detail)
    },
    // 选择文件
    pickFile() {
        let _this = this
        wx.chooseMessageFile({
            count: 1,
            type: 'all',
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFiles[0].path
                _this.uploadFile(tempFilePaths,res.tempFiles[0].name)
            }
        })
    },


    // 点击打开文件

    openFile (e) {
        wx.downloadFile({
            // 示例 url，并非真实存在
            url: e.currentTarget.dataset.url,
            success: function (res) {
                const filePath = res.tempFilePath
                wx.openDocument({
                    filePath: filePath,
                    success: function (res) {
                        console.log('打开文档成功')
                    }
                })
            }
        })
    },

    // 查看图片

    showBigImage (e) {
        this.setData({
            bigImageUrl: e.currentTarget.dataset.url,
            showBigImageTag: true
        })
    },
    hideBigImage (e) {
        this.setData({
            showBigImageTag: false
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            id: app.globalData.openid,
            allData: app.globalData.allMessage
        })
        this.setInfoScroll()
        app.globalData.unreadMessage = 0
    },

    setInfoScroll () {
        let _this = this
        setTimeout(function(){
            _this.setData({
                top:100000
            })
        },200)
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
})

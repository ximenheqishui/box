const app = getApp()

Page({

    data: {
    },
    onLoad: function (options) {
        const async_test = new wx.custom.AsyncArr()
        async_test.run([

            function (data) {
                console.log(1)
                console.log(data)
                setTimeout(function () {
                    console.log(11)
                    async_test.emit( '1的结果')
                }, 1000)
            },
            function (data) {
                console.log(2)
                console.log(data)
                async_test.emit( '2的结果')
            },
            function (data) {
                console.log(3)
                console.log(data)
                async_test.emit( '1的结果')
            },
            function (data) {
                console.log(4)
                console.log(data)
                async_test.emit( '1的结果')
            },
        ])
    },
    onShow: function (e) {
    },
    onShareAppMessage: function (e) {
    },
})

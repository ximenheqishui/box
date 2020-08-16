import axios from './request'

export default {

    commonURL: {
        uploadUrl: baseConfig.apiHost + '/upload'
    },
    // 获取字体图标的json
    getIconJson() {
        return axios({
            url: './static/fonts/iconfont.json',
            method: 'get'
        })
    },
}

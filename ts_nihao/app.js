function common(pageName,name) {
    function joinPath(type) {
        return './src/views/' + pageName + '/index.' + (type ? 'ts' : 'html')
    }
    let obj = {
        name: pageName,
        js: [joinPath(1)],
        chunks: [pageName],
        template: joinPath(),
        filename: `views/${pageName}.html`,
        info: {
            name: name,
            path: `./views/${pageName}.html`
        }
    }
    return obj
}

let entry = [
    common('index','测试各个功能是否好用'),
    common('page','分页组件开发')
]
console.log(entry)
try {
    let str = `<ul>`
    str += `<li><a href="./component.html">给外部引用的组件的文档和js，css</a></li>`
    entry.forEach(function (item) {
        str += `<li><a href="${item.info.path}">${item.info.name}</a></li>`
    })
    str += `</ul>`
    document.getElementsByTagName('body')[0].innerHTML = str
} catch (e) {
    console.log('服务器端')
}

module.exports = entry

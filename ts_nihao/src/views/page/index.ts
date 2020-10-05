// @ts-ignore
import pagination from '@/component/Pagination/index'
import './index.scss'

import * as $ from  'jquery'

let pn = 1, pageSize = 10, total = 1000

let pagination1 = pagination({
    elem: '.page-content',
    currentPage: pn,
    pageSize: pageSize,
    total: total,
    sizeChange: onSizeChange,
    currentChange: onCurrentChange
})

let pagination2 = pagination({
    elem: '.page-content2',
    pagerCount: 12,
    currentPage: 1,
    pageSize: 10,
    total: 1000,
    sizeChange: onSizeChange,
    currentChange: onCurrentChange
})

// 每页多少变化
function onSizeChange(csize,cpn) {
    console.log('分页大小变化',cpn)
    pn = cpn
    pageSize = csize
    getData()
}
// 页码变化
function onCurrentChange (cpn) {
    console.log('页码发生变化',cpn)
    pn = cpn
    getData()
}

function search () {
    // 设置当前页码
    pn = 1
    pagination1.setCurrentPage(pn)
}

// 获取后台数据
function getData () {
    let form = {
        pn,
        pageSize
    }
    console.log('发送的数据',form)
    setTimeout(function(){
        // 设置总数
        total = 1000
        pagination1.setTotal(total)
    },2000)
}


// $.ajax({
//     url: '',
//     method: 'get',
//     type: 'json',
//     success (res) {
//         console.log(res)
//     }
// })

$('h1').css({
    color: 'red'
})

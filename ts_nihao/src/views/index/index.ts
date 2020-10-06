import '@/assets/css/base.scss'
import '@/views/index/index.scss'
import * as $ from 'jquery'
import * as echarts from 'echarts'
// 引用这个兼容到ie9
require('es6-promise').polyfill();

document.getElementsByName('body')
document.title = 'nihao'

let aa:number = 123
console.log(aa + 1)


async function f() {
    let innerHTML = ''
    await new Promise((res,rej)=>{
        setTimeout(()=>{
            innerHTML += `定时器内部的,`
            res()
        },1000)
    })
    innerHTML += `定时器外部的。到ie9 async await Promise ${innerHTML ? "可以用": '不可用'} `
    document.querySelector('.message').innerHTML = innerHTML
}
f()






// $.ajax({
//     url: '',
//     method: 'get',
//     type: 'json',
//     success (res) {
//         console.log(res)
//     }
// })

$('.jquery').css({
    color: 'red'
});


// @ts-ignore
let myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
let option = {
    title: {
        text: 'ECharts可以用'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

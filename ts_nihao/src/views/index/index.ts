import '@/assets/css/base.scss'
import '@/views/index/index.scss'

document.getElementsByName('body')
document.title = 'nihao'

let aa:number = 123
console.log(aa + 1)

async function f() {
    await new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log(1)
            res()
        },1000)
    })
    console.log(2)
}

f()

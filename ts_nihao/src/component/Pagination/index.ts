import './index.scss'

interface Ipagination {
    elem: string, // 外部容器的
    total?: number, // 数据总数
    currentPage?: number, // 当前页码
    pagerCount?: number, // 最多显示几个分页
    pageSize?: number, // 每页多少个
    pageSizes?: number[], // 选择分页参数
    sizeChange?: (size:number,pn:number) => void,
    currentChange?: (num:number) => void,
}

function pagination(options: Ipagination) {
    return  new Pagination(options)
}

class Pagination {
    tempContainer;
    constructor (private settings: Ipagination) {
        this.settings = Object.assign({
            total: 0,
            pagerCount: 7,
            currentPage: 1,
            pageSize: 10,
            pageSizes: [10,20,50,100],
        },settings)
        this.init();
    }
    // 初始化
    init() {
        this.template();
        this.handle();
    }

    //创建模板
    template() {
        this.tempContainer = document.createElement('div');
        this.tempContainer.className = 'com-pagination'
        let innerHTML = `
        <span class="com-pagination-total"></span>`
        innerHTML +=
        `<span class="com-pagination-select">
            <select>`
        this.settings.pageSizes.forEach((item) => {
            innerHTML += `<option value ="${item}">${item}</option>`
        })
        innerHTML +=
            `</select>
            条/页
        </span>`
        innerHTML += `<button type="button" class="com-pagination-prev btn"> <i class="iconfont iconjiantou"></i></button>`

        innerHTML += `<ul class="com-pagination-pager"></ul>`

        innerHTML += `<button type="button" class="com-pagination-next btn"> <i class="iconfont iconarrow-right"></i></button>`

        innerHTML += `<span class="com-pagination-input">
                        前往
                        <input type="text" value="${this.settings.currentPage}">
                        页
                    </span>`
        this.tempContainer.innerHTML = innerHTML
        this.setTotal(this.settings.total)
        document.querySelector(`${this.settings.elem}`).appendChild(this.tempContainer);
    }
    //事件操作
    handle() {
        let _this = this
        let pager = this.tempContainer.querySelector('.com-pagination-pager')
        let prev = this.tempContainer.querySelector('.com-pagination-prev')
        let next = this.tempContainer.querySelector('.com-pagination-next')
        let input = this.tempContainer.querySelector('.com-pagination-input input')
        let select = this.tempContainer.querySelector('.com-pagination-select select')
        // 跳转到那页
        pager.addEventListener('click',function (event) {
            let evt = window.event || event
            let target = evt.target|| evt.srcElement;
            let num = target.getAttribute('data-number')
            if (num) {
                num = parseInt(num)
                _this.createPagerAndSetButton(num)
                _this.settings.currentChange(num)
            }
        })
         // 上一页
        prev.addEventListener('click',function(event){
            if (_this.settings.currentPage > 1) {
                _this.createPagerAndSetButton(--_this.settings.currentPage)
                if (_this.settings.currentChange && typeof _this.settings.currentChange == 'function') {
                    _this.settings.currentChange(_this.settings.currentPage)
                }
            }
        })
        // 下一页
        next.addEventListener('click',function(event){
            let totalPages = Math.ceil(_this.settings.total / _this.settings.pageSize)
            if (_this.settings.currentPage < totalPages) {
                _this.createPagerAndSetButton(++_this.settings.currentPage)
                if (_this.settings.currentChange && typeof _this.settings.currentChange == 'function') {
                    _this.settings.currentChange(_this.settings.currentPage)
                }
            }
        })
        // 输入框跳转页面
        input.addEventListener('keypress',function(event){
            let evt = window.event || event
            let target = evt.target|| evt.srcElement;
            if (event.keyCode == "13") {
                event.preventDefault();
                // console.log(target.value)
                let num = parseInt(target.value)
                let totalPages = Math.ceil(_this.settings.total / _this.settings.pageSize)
                if (isNaN(num) || num < 1) {
                    num = 1
                } else if (num > totalPages) {
                    num = totalPages
                }
                // target.value = num
                _this.createPagerAndSetButton(num)
                if (_this.settings.currentChange && typeof _this.settings.currentChange == 'function') {
                    _this.settings.currentChange(num)
                }
            }
        })

        select.addEventListener('change',function(event) {
            let evt = window.event || event
            let target = evt.target|| evt.srcElement;
            //   console.log(target.value)
            _this.settings.pageSize = target.value
            _this.settings.currentPage = 1
            _this.createPagerAndSetButton(_this.settings.currentPage)
            if (_this.settings.sizeChange && typeof _this.settings.sizeChange == 'function') {
                _this.settings.sizeChange(target.value, 1)
            }
        })
    }
    // 生成页码
    // 点点有四种情况  1、 没有点  2、 左右都有点  3、 只是左边有点  4、 只是右边有点
    createPagerAndSetButton (activePage: number) {
        let _this = this
        let pager = this.tempContainer.querySelector('.com-pagination-pager')
        let prev = this.tempContainer.querySelector('.com-pagination-prev')
        let next = this.tempContainer.querySelector('.com-pagination-next')
        let input = this.tempContainer.querySelector('.com-pagination-input input')
        let totalPages = Math.ceil(_this.settings.total / _this.settings.pageSize)

        _this.settings.currentPage = activePage
        input.value = activePage

        // 设置上下页的状态
        if (activePage == 1 || !_this.settings.total) {
            prev.setAttribute('disabled','disabled')
        } else {
            prev.removeAttribute('disabled')
        }
        if (activePage == totalPages || !_this.settings.total) {
            next.setAttribute('disabled','disabled')
        } else {
            next.removeAttribute('disabled')
        }

        // 生成分页
        let innerHTML = ''


        // 小于总数的不需要显示点点
        if (totalPages <= _this.settings.pagerCount) {
            for (let i = 0; i < totalPages; i++ ){
                innerHTML += `<li class="number ${i ==  (activePage - 1) ? 'active': ''}" data-number="${i+1}">${i + 1}</li>`
            }
        } else {
            let active = activePage - 1
            let show = _this.settings.pagerCount - 2  // 除去第一页和最后一页中间可以显示的页数
            let backshow = 0
            let fontshow = 0
            let buquan = 0
            // 判断可显示的页码是否是偶数
            if (show % 2 == 0) {
                buquan = 3
                backshow = (active +  show / 2) - 1
                fontshow =  active -  show / 2
            } else {
                buquan = 2
                backshow =  active +  Math.floor(show / 2)
                fontshow =  active -  Math.floor(show / 2)
            }
            for (let i = 0; i < totalPages; i++ ){
                if (i==0) {
                    innerHTML += `<li class="number ${i == active ? 'active': ''}" data-number="${i+1}">${i + 1}</li>`
                    // 当选中  大于最多可显示数量
                    if (activePage >= show) {
                        innerHTML += `<li class="more"><i class="iconfont iconellipsis2"></i></li>`
                    }
                } else if (i == (totalPages -1)) {
                    // 当选中 小于总数减去可显示页数
                    if (activePage < totalPages - show + buquan) {
                        innerHTML += `<li class="more"><i class="iconfont iconellipsis2"></i></li>`
                    }
                    innerHTML += `<li class="number ${i == active ? 'active': ''}" data-number="${i+1}">${i + 1}</li>`
                } else {
                    // 中间页向前推到头了所以  算是从第一页开始向后显示
                    if (fontshow <= 1) {
                        if (i <= show) {
                            innerHTML += `<li class="number ${i == active ? 'active': ''}" data-number="${i+1}">${i + 1}</li>`
                        }
                    //  选中页向后推到到头了  算是从最后一页向前开始显示
                    } else if (backshow >= totalPages - 2) {
                        if (i > totalPages - 2 - show) {
                            innerHTML += `<li class="number ${i == active ? 'active': ''}" data-number="${i+1}">${i + 1}</li>`
                        }
                    // 选中页 前后都没有到头  就是显示前后之间的页码
                    } else {
                        if (i >= fontshow &&  i <= backshow) {
                            innerHTML += `<li class="number ${i == active ? 'active': ''}" data-number="${i+1}">${i + 1}</li>`
                        }
                    }
                }
            }
        }
        pager.innerHTML = innerHTML
    }

    setTotal (value: number) {
        let total = this.tempContainer.querySelector('.com-pagination-total')
        this.settings.total = value
        total.innerHTML = `共${this.settings.total}条`
        this.createPagerAndSetButton(this.settings.currentPage)
    }

    setCurrentPage (value: number) {
        this.settings.currentPage = value
        this.createPagerAndSetButton(this.settings.currentPage)
    }
}

export default pagination

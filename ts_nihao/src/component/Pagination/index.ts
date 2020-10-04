import './index.scss'

interface Ipagination {
    elem: string, // 外部容器的
    total?: number, // 数据总数
    currentPage?: number, // 当前页码
    pagerCount?: number,
    pageSize?: number, // 每页多少个
    pageSizes?: number[], // 选择分页参数
    sizeChange?: () => void,
    currentChange?: () => void,
    prevClick?: () => void,
    nextClick?: () => void
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
        <span class="com-pagination-total">共${this.settings.total}条</span>`
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
        innerHTML += `<span class="com-pagination-prev btn">上一页</span>`

        innerHTML += `<ul class="com-pagination-pager"></ul>`

        innerHTML += `<span class="com-pagination-next btn">下一页</span>`

        innerHTML += `<span class="com-pagination-input">
                        前往
                        <input type="text" value="${this.settings.currentPage}">
                        页
                    </span>`
        this.tempContainer.innerHTML = innerHTML
        this.createPager(this.settings.currentPage)
        document.querySelector(`${this.settings.elem}`).appendChild(this.tempContainer);
    }
    //事件操作
    handle() {
        let _this = this
        let pager = this.tempContainer.querySelector('.com-pagination-pager')
        pager.addEventListener('click',function (event) {
            let evt = window.event || event
            let target = evt.target|| evt.srcElement;
            if (target.getAttribute('data-number')) {
                _this.createPager(parseInt(target.getAttribute('data-number')))
            }
        })
    }
    // 生成页码
    // 点点有四种情况  1、 没有点  2、 左右都有点  3、 只是左边有点  4、 只是右边有点
    createPager (activePage: number) {
        let _this = this
        let pager = this.tempContainer.querySelector('.com-pagination-pager')
        let totalPages = Math.ceil(_this.settings.total / _this.settings.pageSize)
        let innerHTML = ''
        _this.settings.currentPage = activePage
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
                        innerHTML += `<li class="more">...</li>`
                    }
                } else if (i == (totalPages -1)) {
                    // 当选中 小于总数减去可显示页数
                    if (activePage < totalPages - show + buquan) {
                        innerHTML += `<li class="more">...</li>`
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
}

export default pagination

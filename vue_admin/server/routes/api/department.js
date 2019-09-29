var express = require('express')

var router = express.Router()

router.get('/getDeptTree',function (req, res, next) {


  let data = {
    message: '成功了',
    code: 0,
    data: [
      { id: 0,
        name: '顶级菜单',
      children:[
        {
          id: 1,
          name: '首页', // 当前的名称
          parent_id: '', // 父节点id
          parent_name: '', // 父节点名称
          sort_order: 1, // 排序值
          status: '0', // 是否启用  0 是启用  1 是不启用
          leader: [ '1' ],
          children:[{
            id:12312,
            name: '管理员管理', // 当前的名称
            parent_id: '', // 父节点id
            parent_name: '', // 父节点名称
            sort_order: 1, // 排序值
            status: '0', // 是否启用  0 是启用  1 是不启用
          }]
        },
        {
          id: 3,
          name: '系统设置',
          pid: 0,
          path: '',
          params: '',
          children: [{
            id: 31,
            name: '菜单设置',
            pid: 3,
            path: '/admin/menu',
            params: '',
          }, {
            id: 32,
            name: '权限设置',
            pid: 3,
            path: '/admin/right',
            params: '',
          },
            {
              id: 33,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 323,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 331,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 3322,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 3332,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 3324,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 3325,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 3305,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 33050,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            }
          ]
        }
      ] }
      ]
  }
  // res.json(400,data)
  res.json(data)
})
router.get('/getUsableDeptTree',function (req, res, next) {


  let data = {
    message: '成功了',
    code: 0,
    data: [
      { id: 0,
        name: '顶级菜单',
      children:[
        {
          id: 1,
          url: '', // 填写后台的请求的url
          type: '1', // 1 菜单类型  2 按钮类型
          name: '首页', // 当前的名称
          path: '/home', // 路由
          parent_id: '', // 父节点id
          parent_name: '', // 父节点名称
          sort_order: 1, // 排序值
          icon: '', // 字体图标
          unique_id: '321321', // 唯一标识
          status: '0', // 是否启用  0 是启用  1 是不启用
          last_menu: '1', // 是否为最后一级  0不是最后一层   1 是最后一层
          children:[{
            id:12312,
            url: '', // 填写后台的请求的url
            type: '2', // 1 菜单类型  2 按钮类型
            name: '管理员管理', // 当前的名称
            path: '/home', // 路由
            parent_id: '', // 父节点id
            parent_name: '', // 父节点名称
            sort_order: 1, // 排序值
            icon: '', // 字体图标
            unique_id: '321321', // 唯一标识
            status: '0', // 是否启用  0 是启用  1 是不启用
            last_menu: '1' // 是否为最后一级  0不是最后一层   1 是最后一层
          }]
        },
        {
          id: 3,
          name: '系统设置',
          pid: 0,
          path: '',
          params: '',
          children: [{
            id: 31,
            name: '菜单设置',
            pid: 3,
            path: '/admin/menu',
            params: '',
          }, {
            id: 32,
            name: '权限设置',
            pid: 3,
            path: '/admin/right',
            params: '',
          },
            {
              id: 33,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 323,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 331,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 3322,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 3332,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 3324,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 3325,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 3305,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            },
            {
              id: 33050,
              name: '角色管理',
              pid: 3,
              path: '/admin/role',
              params: '',
            }
          ]
        }
      ] }
      ]
  }
  // res.json(400,data)
  res.json(data)
})
router.post('/save',function (req, res, next) {
  console.log(req.body)

  let data = {
    message: '成功了',
    code: 0,
    data:{
      id: new Date().getTime()
    }
  }
  // res.json(400,data)
  res.json(data)
})
router.put('/update',function (req, res, next) {
  console.log(req.body)

  let data = {
    message: '成功了',
    code: 0,
    data:{
      id: '123345'
    }
  }
  // res.json(400,data)
  res.json(data)
})
router.delete('/delByIds/:id',function (req, res, next) {
  let data = {
    message: '成功了',
    code: 0
  }
  // res.json(400,data)
  res.json(data)
})


module.exports = router

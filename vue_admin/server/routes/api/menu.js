var express = require('express')

var router = express.Router()

router.get('/getMenuTree',function (req, res, next) {


  let data = {
    message: '成功了',
    code: 0,
    data: [{
      id: 0,
      name: '后台管理系统',
      unique_id: 'admin',
      children:[{
          id: 1,
          url: '', // 填写请求后台的url
          type: '1', // 1 菜单类型  2 按钮类型
          name: '首页', // 当前的名称
          path: '/', // 路由
          parent_id: '0', // 父节点id
          parent_name: '后台管理系统', // 父节点名称
          num: 1, // 排序值
          icon: 'icon-shouye', // 字体图标
          unique_id: 'home', // 唯一标识
          status: '0', // 是否启用  0 是启用  1 是不启用
          last_menu: '1', // 是否为最后一级  0不是最后一层   1 是最后一层
          children:[{
            id:12312,
            url: '/admin/export', // 填写后台的请求的url
            type: '2', // 1 菜单类型  2 按钮类型
            name: '导出', // 当前的名称
            path: '', // 路由
            parent_id: '1', // 父节点id
            parent_name: '首页', // 父节点名称
            num: 1, // 排序值
            icon: '', // 字体图标
            unique_id: 'home_export', // 唯一标识
            status: '0', // 是否启用  0 是启用  1 是不启用
            last_menu: '1' // 是否为最后一级  0不是最后一层   1 是最后一层
          }]
        },
        {
          id: 2,
          name: '系统设置',
          unique_id: 'system', // 唯一标识
          parent_id: '0', // 父节点id
          parent_name: '后台管理系统', // 父节点名称
          icon: 'icon-set', // 字体图标
          children: [{
            id: 21,
            name: '菜单权限管理',
            url: '', // 填写请求后台的url
            type: '1', // 1 菜单类型  2 按钮类型
            path: '/admin/menu', // 路由
            parent_id: '2', // 父节点id
            parent_name: '系统设置', // 父节点名称
            num: 1, // 排序值
            icon: '', // 字体图标
            unique_id: 'admin_menu', // 唯一标识
            status: '0', // 是否启用  0 是启用  1 是不启用
            last_menu: '1', // 是否为最后一级  0不是最后一层   1 是最后一层
            children:[{
              id:211,
              url: '/menu/add', // 填写后台的请求的url
              type: '2', // 1 菜单类型  2 按钮类型
              name: '添加', // 当前的名称
              path: '', // 路由
              parent_id: '21', // 父节点id
              parent_name: '菜单权限管理', // 父节点名称
              num: 1, // 排序值
              icon: '', // 字体图标
              unique_id: 'add_menu', // 唯一标识
              status: '0', // 是否启用  0 是启用  1 是不启用
              last_menu: '1' // 是否为最后一级  0不是最后一层   1 是最后一层
            },
              {
                id:212,
                url: '/menu/update', // 填写后台的请求的url
                type: '2', // 1 菜单类型  2 按钮类型
                name: '修改', // 当前的名称
                path: '', // 路由
                parent_id: '21', // 父节点id
                parent_name: '菜单权限管理', // 父节点名称
                num: 1, // 排序值
                icon: '', // 字体图标
                unique_id: 'update_menu', // 唯一标识
                status: '0', // 是否启用  0 是启用  1 是不启用
                last_menu: '1' // 是否为最后一级  0不是最后一层   1 是最后一层
              },
              {
                id:213,
                url: '/menu/delete', // 填写后台的请求的url
                type: '2', // 1 菜单类型  2 按钮类型
                name: '删除', // 当前的名称
                path: '', // 路由
                parent_id: '21', // 父节点id
                parent_name: '菜单权限管理', // 父节点名称
                num: 1, // 排序值
                icon: '', // 字体图标
                unique_id: 'delete_menu', // 唯一标识
                status: '0', // 是否启用  0 是启用  1 是不启用
                last_menu: '1' // 是否为最后一级  0不是最后一层   1 是最后一层
              }
            ]
          }, {
            id: 22,
            name: '角色权限管理',
            url: '', // 填写请求后台的url
            type: '1', // 1 菜单类型  2 按钮类型
            path: '/admin/role', // 路由
            parent_id: '2', // 父节点id
            parent_name: '系统设置', // 父节点名称
            num: 1, // 排序值
            icon: '', // 字体图标
            unique_id: 'admin_role', // 唯一标识
            status: '0', // 是否启用  0 是启用  1 是不启用
            last_menu: '1', // 是否为最后一级  0不是最后一层   1 是最后一层
          },
            {
              id: 23,
              name: '部门管理',
              url: '', // 填写请求后台的url
              type: '1', // 1 菜单类型  2 按钮类型
              path: '/admin/department', // 路由
              parent_id: '2', // 父节点id
              parent_name: '系统设置', // 父节点名称
              num: 1, // 排序值
              icon: '', // 字体图标
              unique_id: 'admin_department', // 唯一标识
              status: '0', // 是否启用  0 是启用  1 是不启用
              last_menu: '1', // 是否为最后一级  0不是最后一层   1 是最后一层
            },
            {
              id: 24,
              name: '用户管理',
              url: '', // 填写请求后台的url
              type: '1', // 1 菜单类型  2 按钮类型
              path: '/admin/user', // 路由
              parent_id: '2', // 父节点id
              parent_name: '系统设置', // 父节点名称
              num: 1, // 排序值
              icon: '', // 字体图标
              unique_id: 'admin_user', // 唯一标识
              status: '0', // 是否启用  0 是启用  1 是不启用
              last_menu: '1', // 是否为最后一级  0不是最后一层   1 是最后一层
            }
          ]
        }
      ]
        }
      ]
  }
  // res.json(400,data)
  res.json(data)
})
router.get('/getUsableMenuTree',function (req, res, next) {


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
          num: 1, // 排序值
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
            num: 1, // 排序值
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

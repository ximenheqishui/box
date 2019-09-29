
var express = require('express')

var router = express.Router()

router.get('/', function (req, res, next) {
  console.log(req.query.token)
  // console.log(req.body.token)
  let data = {
    message:'成功了',
    code: 0,
    user_info: {
      id: '1',
      user_name: '张三',
      password: '',
      email: '296876606@QQ.com',
      mobile: '18354205371',
      sex: 1,
      sex_name: '男',
      dept_id: '33',
      dept_path:JSON.stringify([0,3,33]),
      dept_name: '总部',
      roles:[{id:1,name:'123'}],
      role_ids: ['1'],
      status: '0',
      create_time: '2017-12-11 12:12:12',
      avatar: '/static/img/avatar.jpg',
      menu: [
        {
          icon:'icon-shouye',
          path: '/',
          name:'首页'
        },
        {
          icon:'icon-qiche1',
          name: '加油站业务管理',
          subMenu: [
            {
              path: '/business/collection',
              name: '加油机实时数据'
            },
            {
              path: '/business/tanker',
              name: '加油机管理'
            }
          ],
        },
        {
          icon:'icon-web-icon-',
          name: '企业信息管理',
          subMenu: [
            {
              path: '/company/company',
              name: '企业管理'
            }
          ],
        },
        {
          icon:'icon-yujing1',
          name: '预警管理',
          subMenu: [
            {
              path: '/warning/equipment',
              name: '设备状态监控报警'
            }
          ],
        },
        {
          icon:'icon-tongji1',
          name: '统计分析',
          subMenu: [
            {
              path: '/statistic/sales-income',
              name: '数量和收入统计'
            }
          ],
        },
        {
          icon:'icon-set',
          name: '系统管理',
          subMenu: [
            {
              path: '/admin/menu',
              name: '菜单权限管理'
            },
            {
              path: '/admin/role',
              name: '角色权限管理'
            },
            {
              path: '/admin/department',
              name: '部门管理'
            },
            {
              path: '/admin/user',
              name: '用户管理'
            }
          ],
        }
      ],
      permission: ['add_menu', 'update_menu', 'delete_menu']
    }
  }
  // res.json(400,data)
  res.json(data)
})


module.exports = router

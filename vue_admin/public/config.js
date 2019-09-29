var baseConfig = {
  apiHost: 'http://localhost:7000/admin',
  systemName: '智慧税源监控数据平台',
 /**
  * 各个页面的配置信息   企业管理页面
  * */
  asideMenu:[
    {
      icon:'  icon-shouye',
      path: '/',
      name:'首页'
    },
    {
      icon:'  icon-qiche1',
      name: '加油站业务管理',
      children: [
        // {
        //   path: '/business/warning',
        //   name: '报警阈值设置'
        // },
        {
          path: '/business/collection',
          name: '加油机实时数据'
        },
        // {
        //   path: '/business/center-daily',
        //   name: '申报明细'
        // },
        {
          path: '/business/tanker',
          name: '加油机管理'
        }
      ],
    },
    {
      icon:'  icon-web-icon-',
      name: '企业信息管理',
      children: [
        {
          path: '/company/company',
          name: '企业管理'
        }
      ],
    },
    {
      icon:'  icon-yujing1',
      name: '预警管理',
      children: [
        {
          path: '/warning/equipment',
          name: '设备状态监控报警'
        },
        /*{
          path: '/warning/1',
          name: '收入差额报警'
        }*/
      ],
    },
    {
      icon:'  icon-tongji1',
      name: '统计分析',
      children: [
        {
          path: '/statistic/sales-income',
          name: '数量和收入统计'
        },
        {
          path: '/9',
          name: '收入对比统计',
          children: [
            {
              path: '/statistic/----',
              name: '三级路由'
            }
          ],
        }
      ],
    },
    {
     icon:'  icon-set',
     name: '系统管理',
     children: [
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
   },
  ]
}

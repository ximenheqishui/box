var baseUrl =  'http://localhost:3000'
var baseConfig = {
  apiHost: 'http://localhost:7000/admin',
  systemName: 'li-box',
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

import Layout from '@/views/layout'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/home'),
        name: 'home',
        meta: { title: '首页', affix: true } }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'menu',
        component: () => import('@/views/admin/menu'),
        name: 'menus',
        meta: {
          title: '菜单权限管理'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/admin/role'),
        name: 'role',
        meta: {
          title: '角色权限管理'
        }
      },
      {
        path: 'department',
        component: () => import('@/views/admin/department'),
        name: 'department',
        meta: {
          title: '部门管理'
        }
      },
      {
        path: 'user',
        component: () => import('@/views/admin/user'),
        name: 'user',
        meta: {
          title: '用户管理'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页'
    },
    component: () => import('@/views/login/index')
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/404'),
        meta: { title: '404' } }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]
export default routes

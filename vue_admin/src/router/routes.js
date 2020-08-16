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
        meta: { title: '首页', affix: true }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/test'),
        name: 'test',
        meta: { title: '测试' }
      }
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
          title: '菜单权限管理',
          unique_id: 'admin-menu'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/admin/role'),
        name: 'role',
        meta: {
          title: '角色权限管理',
          unique_id: 'admin-role'
        }
      },
      {
        path: 'department',
        component: () => import('@/views/admin/department'),
        name: 'department',
        meta: {
          title: '部门管理',
          unique_id: 'admin-department'
        }
      },
      {
        path: 'user',
        component: () => import('@/views/admin/user'),
        name: 'user',
        meta: {
          title: '用户管理',
          unique_id: 'admin-user'
        }
      },
      {
        path: 'dictionaries',
        component: () => import('@/views/admin/dictionaries'),
        name: 'dictionaries',
        meta: {
          title: '数据字典管理',
          unique_id: 'admin-dictionaries'
        }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'articleType',
        component: () => import('@/views/article/articleType'),
        name: 'articleType',
        meta: {
          title: '文章分类管理',
          unique_id: 'article-type'
        }
      },
      {
        path: 'articleList',
        component: () => import('@/views/article/articleList'),
        name: 'articleList',
        meta: {
          title: '文章列表',
          unique_id: 'article-list'
        }
      },
      {
        path: 'articleEditor',
        component: () => import('@/views/article/articleEditor'),
        name: 'articleEditor',
        meta: {
          title: '文章编辑',
          unique_id: 'article-editor'
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
    path: '/refresh',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: { template: '<div></div>' },
        meta: {}
      }
    ]
  },
  {
    path: '/403',
    component: Layout,
    children: [
      {
        path: '',
        name: 'exception_403',
        component: () => import('@/views/403'),
        meta: { title: '403' } }
    ]
  },
  {
    path: '/404',
    component: Layout,
    children: [
      {
        path: '',
        name: 'exception_404',
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

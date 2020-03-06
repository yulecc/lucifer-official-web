import Layout from '@/layouts'
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    meta: { title: '首页' },
    component: Layout,
    children: [
      {
        path: 'home',
        alias: '/',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "view-home" */ '@/views/Home.vue')
      },
      {
        path: 'solution',
        component: () =>
          import(/* webpackChunkName: "view-solution" */ '@/views/Solution.vue')
      },
      {
        path: 'everyday',
        component: () =>
          import(/* webpackChunkName: "view-everyday" */ '@/views/Everyday.vue')
      },
      {
        path: 'download',
        component: () =>
          import(/* webpackChunkName: "view-download" */ '@/views/Download.vue')
      },
      {
        path: 'video',
        component: () =>
          import(/* webpackChunkName: "view-video" */ '@/views/Video.vue')
      }
    ]
  }
]

// 基础路由
export const constantRouterMap = []

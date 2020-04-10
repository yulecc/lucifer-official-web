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
        path: 'solutionDetail',
        name: 'solutionDetail',
        component: () => import('@/views/SolutionDetail.vue')
      },
      {
        path: 'everyday/:id',
        component: () =>
          import(
            /* webpackChunkName: "view-solution" */ '@/views/ProblemDetail.vue'
          )
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
      },
      {
        path: 'book',
        component: () =>
          import(/* webpackChunkName: "view-book" */ '@/views/Book.vue')
      }
    ]
  }
]

// 基础路由
export const constantRouterMap = []

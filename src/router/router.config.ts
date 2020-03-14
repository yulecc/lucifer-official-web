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
          import(/* webpackChunkName: "view-home" */ '@/views/Home/Home.vue')
      },
      {
        path: 'solution',
        component: () =>
          import(
            /* webpackChunkName: "view-solution" */ '@/views/Solution/Solution.vue'
          )
      },
      {
        path: 'everyday/:id',
        component: () =>
          import(
            /* webpackChunkName: "view-everyday" */ '@/views/ProblemDetail/ProblemDetail.vue'
          )
      },
      {
        path: 'everyday',
        component: () =>
          import(
            /* webpackChunkName: "view-everyday" */ '@/views/Everyday/Everyday.vue'
          )
      },
      {
        path: 'download',
        component: () =>
          import(
            /* webpackChunkName: "view-download" */ '@/views/Download/Download.vue'
          )
      },
      {
        path: 'video',
        component: () =>
          import(/* webpackChunkName: "view-video" */ '@/views/Video/Video.vue')
      },
      {
        path: 'book',
        component: () =>
          import(/* webpackChunkName: "view-book" */ '@/views/Book/Book.vue')
      }
    ]
  }
]

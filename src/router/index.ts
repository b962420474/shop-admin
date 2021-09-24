import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import AppLayout from '@/layout/AppLayout.vue'
import product from './modules/product'
import { store } from '@/store'
const routes:RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      product
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 进度条的配置
nprogress.configure({})

// VueRouter 4 中可以不写 next 了，默认就是通过状态
router.beforeEach((to, from) => {
  nprogress.start()
  if (to.meta.requiresAuth && !store.state.user) {
    return {
      path: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})
export default router

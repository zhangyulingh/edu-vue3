import { createRouter, createWebHistory } from 'vue-router'
import Applayout from '@/components/layout/AppLayout.vue'
import IndexViewVue from '@/views/IndexView.vue'
import { useTokenStore } from '@/stores/mytoken'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Applayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'index',
          component: IndexViewVue
        },
        {
          path: '/menus',
          name: 'menus',
          component: () => import('@/views/menu/MenuIndex.vue')
        },
        {
          path: '/menus/create',
          name: 'menu-create',
          component: () => import('@/views/menu/CreateOrEdit.vue')
        },
        {
          path: '/menus/:id/edit',
          name: 'menu-edit',
          component: () => import('@/views/menu/CreateOrEdit.vue')
        },
        // 资源类别
        {
          path: '/resourcesCategory',
          name: 'resourcesCategory',
          component: () => import('@/views/resourceCategory/ResourceIndex.vue')
        },
        // 资源列表
        {
          path: '/resources',
          name: 'resourcess',
          component: () => import('@/views/resources/index.vue')
        },
        // 角色列表
        {
          path: '/roles',
          name: 'roles',
          component: () => import('@/views/roles/index.vue')
        },
        // 给角色分配权限
        {
          path: '/roles/:roleId/alloc-Menus',
          name: 'alloc-Menus',
          component: () => import('@/views/roles/components/AllocMenus.vue'),
          props: true
        },
        // 给角色分配资源
        {
          path: '/roles/:roleId/alloc-resources',
          name: 'alloc-resources',
          component: () => import('@/views/roles/components/AllocResources.vue'),
          props: true
        },
        // 用户管理
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/users/index.vue')
        },
        // 课程管理
        {
          path: '/course',
          name: 'course',
          component: () => import('@/views/course/index.vue')
        },
        // 课程新增和编辑
        {
          path: '/course/:courseId/edit',
          name: 'course-edit',
          component: () => import('@/views/course/components/CreatOrEdit.vue'),
          props: true
        },
        // 课程内容管理
        {
          path: '/course/:courseId/content',
          name: 'course-content',
          component: () => import('@/views/course/components/Content.vue'),
          props: true
        },
        {
          path: '/course/create',
          name: 'course-create',
          component: () => import('@/views/course/components/CreatOrEdit.vue')
        },
        // 报错页面
        {
          path: '/:xxx(.*)*',
          name: 'ErrorPage',
          component: () => import('@/views/ErrorPage.vue')
        }
      ]
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta.requiresAuth)) {
    const store = useTokenStore()
    if (!store.token.access_token) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }
  next()
})
export default router

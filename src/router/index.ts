import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/ViewIndex.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        isGuest: true,
      },
    },
    {
      path: '/login/password',
      name: 'LoginPassword',
      component: () => import('@/views/auth/LoginPassword.vue'),
      meta: {
        isGuest: true,
      },
    },
    {
      path: '/login/link',
      name: 'LoginLink',
      component: () => import('@/views/auth/LoginLink.vue'),
      meta: {
        isGuest: true,
      },
    },
    {
      path: '/login/token',
      name: 'LoginToken',
      component: () => import('@/views/auth/LoginToken.vue'),
      meta: {
        isGuest: true,
      },
    },
    {
      path: '/login/callback',
      name: 'LoginCallback',
      component: () => import('@/views/auth/LoginCallback.vue'),
      meta: {
        isGuest: true,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        isGuest: true,
      },
    },
    {
      path: '/register/password',
      name: 'RegisterPassword',
      component: () => import('@/views/auth/RegisterPasswordView.vue'),
      meta: {
        isGuest: true,
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/ViewDashboard.vue'),
    },
    {
      path: '/glossary',
      name: 'Glossary',
      component: () => import('@/views/ViewGlossary.vue'),
      meta: {
        public: true,
      },
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/views/ViewProjects.vue'),
    },
    {
      path: '/teams',
      name: 'Teams',
      component: () => import('@/views/teams/ViewTeamsIndex.vue'),
    },
    {
      path: '/teams/:teamId',
      name: 'SingleTeam',
      component: () => import('@/views/teams/ViewSingleTeam.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/ViewAccount.vue'),
    },
    {
      path: '/sign-out',
      name: 'SignOut',
      component: () => import('@/views/ViewErrorNotFound.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/ViewErrorNotFound.vue'),
      meta: {
        public: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const user = useUserStore().user

  if (to.name === 'Index') {
    return next('/dashboard')
  }

  // If route is marked as public, always allow visiting
  if (to.meta.public) {
    return next()
  }

  // Check if logged in
  if (!user) {
    // If user is not logged in (guest) then show route
    if (to.meta.isGuest) {
      return next()
    }
    // If route not for guests, redirect to login
    return next('/login')
  } else {
    // If user is already logged in and trying to access guest routes
    // redirect to dashboard
    if (to.meta.isGuest) {
      return next('/dashboard')
    }

    // By default, allow logged in users access all routes
    return next()
  }
})

export default router

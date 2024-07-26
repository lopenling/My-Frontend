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
        public: true,
      },
    },
    {
      path: '/login/password',
      name: 'LoginPassword',
      component: () => import('@/views/auth/LoginPassword.vue'),
      meta: {
        public: true,
      },
    },
    {
      path: '/login/link',
      name: 'LoginLink',
      component: () => import('@/views/auth/LoginLink.vue'),
      meta: {
        public: true,
      },
    },
    {
      path: '/login/token',
      name: 'LoginToken',
      component: () => import('@/views/auth/LoginToken.vue'),
      meta: {
        public: true,
      },
    },
    {
      path: '/login/callback',
      name: 'LoginCallback',
      component: () => import('@/views/auth/LoginCallback.vue'),
      meta: {
        public: true,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        public: true,
      },
    },
    {
      path: '/register/password',
      name: 'RegisterPassword',
      component: () => import('@/views/auth/RegisterPasswordView.vue'),
      meta: {
        public: true,
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/ViewDashboard.vue'),
    },
    {
      path: '/translate',
      name: 'Translate',
      component: () => import('@/views/ViewTranslate.vue'),
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/views/ViewProjects.vue'),
    },
    {
      path: '/teams',
      name: 'Teams',
      component: () => import('@/views/teams/TeamsIndex.vue'),
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
      path: '/privacy',
      name: 'Privacy',
      component: () => import('@/views/ViewPrivacy.vue'),
      meta: {
        public: true,
      },
    },
    {
      path: '/terms',
      name: 'Terms',
      component: () => import('@/views/ViewTerms.vue'),
      meta: {
        public: true,
      },
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

  // Check if logged in
  if (!user) {
    // If not logged in, put public route, then show
    if (to.meta.public) {
      return next()
    }
    // If route not public, redirect to login
    return next('/login')
  } else {
    // If user is already logged in and trying to access public routes
    // redirect to dashboard
    if (to.meta.public) {
      return next('/dashboard')
    }

    // Cases where user is logged in, always allow next
    return next()
  }
})

export default router

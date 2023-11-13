import { createRouter, createWebHistory } from 'vue-router'
import { useAuth0Store } from '@/stores/auth0'



const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter:async (to, from, next) => {
        const auth0Store = useAuth0Store();
        // Add a condition to check if the user is authenticated
        if (auth0Store.isAuthenticatedCheck) {
          next();
        } else {
          await auth0Store.handleAuthentication();
          if (auth0Store.isAuthenticated) {
            next();
          } else {
            next('/login');
          }
        } 
      },
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          name: 'glossary',
          path: '/glossary',
          component: () => import('@/components/glossary/index.vue')
        },
        {
          name: 'organization',
          path: '/organization',
          component: () => import('@/components/organization.vue')
        },
        {
          name: 'team',
          path: '/team',
          component: () => import('@/components/team.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/login/password:email',
      name: 'password',
      component: () => import('../components/sign-in-up/passwordField.vue'),
    },
    {
      path: '/:notfound',
      name: 'notfound',
      component: () => import('../views/notFound.vue')
    },
    
  ]
});



export default router

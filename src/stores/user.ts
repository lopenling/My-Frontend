import { axios } from '@/lib/axios'
import { defineStore } from 'pinia'
import type { TEAM_ROLES } from '@/stores/teams'

export type LoginMethod = 'password' | 'magic_link'

export type CheckResponse = {
  defaultLoginMethod: LoginMethod
  email: string
}

export type User = {
  id: number
  firstName: string
  lastName: string
  fullName: string
  avatar: string
  defaultLoginMethod: string
  email: string
  updatedAt: string
  createdAt: string
  role: keyof typeof TEAM_ROLES
  // Not sure about them yet
  invite_pending: boolean
}

export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    user: null as User | null,
  }),

  actions: {
    /**
     * Start user register / signup flow
     */
    register(email: string) {
      return axios.post('/v1/auth/register', { email }).then(({ data }) => data as CheckResponse)
    },

    /**
     * Send magic link to user email, which can be used to login
     */
    sendMagicLink(email: string) {
      return axios.post('/v1/auth/magic_link', { email }).then(({ data }) => data)
    },

    /**
     * Login user with token from magic link
     */
    loginToken(token: string) {
      return axios.post('/v1/auth/token', { token }).then(({ data }) => {
        this.user = data
        return data
      })
    },

    /**
     * Login user with email and password.
     * With option to set default login to password
     */
    loginPassword(email: string, password: string, defaultToPassword: boolean) {
      return axios
        .post('/v1/auth/login', {
          email,
          password,
          defaultToPassword,
        })
        .then(({ data }) => {
          this.user = data
          return data
        })
    },

    /**
     * Get current logged in user
     */
    me(): Promise<User> {
      return axios.get('/v1/me').then(({ data }) => {
        this.user = data
        return data
      })
    },

    /**
     * At signup set user initial password
     */
    setInitialPassword(email: string, password: string, password_repeat: string) {
      return axios
        .post('/v1/auth/set_password', {
          email,
          password,
          password_repeat,
        })
        .then(({ data }) => {
          this.user = data
          return data
        })
    },

    /**
     * Logout user and clear user state
     */
    logOut() {
      return axios.post('/v1/auth/logout').then(({ data }) => {
        this.user = null
        return data
      })
    },
  },
})

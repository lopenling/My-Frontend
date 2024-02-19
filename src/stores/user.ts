import { defineStore } from 'pinia'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@vue/apollo-composable'

export const USER_LOGIN_METHODS = {
  password: 'password',
  magic_link: 'magic_link',
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
    }
  },
  actions: {
    async getByEmail(email: string): Promise<{
      default_login_method: 'password' | 'magic_link'
    }> {
      const { onResult, onError } = await useQuery(
        gql`
          query user_by_email($email: String!) {
            users(where: { email: { _eq: $email } }) {
              default_login_method
            }
          }
        `,
        { email },
      )
      return new Promise((res, rej) => {
        onResult(result => {
          res(result.data?.users?.[0])
        })
        onError((err) => {
          rej(err)
        })
      })
    },

    createUser(email: string) {
      return useMutation(
        gql`
          mutation insert_users($email: user_insert_input!) {
            insert_user_one(email: $email) {
              email
            }
          }
        `,
        () => ({
          variables: {
            email,
          },
        }),
      )
    },
  },
})

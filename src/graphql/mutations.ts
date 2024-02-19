import gql from 'graphql-tag'

export const INSERT_USER = gql`
mutation insert_users($email: user_insert_input!) {
    insert_user_one(email: $email) {
      email
    }
  }
`

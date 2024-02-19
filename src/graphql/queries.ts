import gql from 'graphql-tag'

export const USER_BY_EMAIL = gql`
  query user_by_email($email: String!) {
    users(where: {email: {_eq: $email}}) {
      default_login_method
    }
  }
`;

export const User = `
  type User {
    _id: ID!
    reference: String
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    phone: String!
    password: String!
    active: Boolean
    createdAt: String!
    updatedAt: String!
  }
`
export default () => [
  User,
]

const AuthPayload = `
  type AuthPayload {
    _id: ID!
    username: String!
    token: String!
    createdAt: String!
    updatedAt: String!
  }
`
// add other dependencies in the export
export default () => [AuthPayload]

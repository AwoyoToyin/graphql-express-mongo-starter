const UpdatedUser = `
  type UpdatedUser {
    _id: ID!
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    phone: String!
    createdAt: String!
    updatedAt: String!
  }
`
// add other dependencies in the export
export default () => [UpdatedUser]

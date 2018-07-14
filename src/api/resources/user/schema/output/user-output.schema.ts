const UserOutput = `
  type UserOutput {
    _id: ID
    reference: String
    firstname: String
    lastname: String
    username: String
    email: String
    phone: String
    rating: String
    active: Boolean
    createdAt: String
    updatedAt: String
  }
`
// add other dependencies in the export
export default () => [
    UserOutput,
]

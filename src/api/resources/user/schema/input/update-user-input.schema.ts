const UpdateUserInput = `
  input UpdateUserInput {
    Id: ID!
    firstname: String
    lastname: String
    username: String
    email: String
    phone: String
    password: String
  }
`
// add other dependencies in the export
export default () =>  [UpdateUserInput]

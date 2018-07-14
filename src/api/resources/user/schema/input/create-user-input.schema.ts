const CreateUserInput = `
  input CreateUserInput {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    phone: String!
    password: String!
  }
`
// add other dependencies in the export
export default () => [CreateUserInput]

const UpdateTodoInput = `
  input UpdateTodoInput {
    _id: ID!
    content: String!
  }
`
// add other dependencies in the export
export default () =>  [UpdateTodoInput]

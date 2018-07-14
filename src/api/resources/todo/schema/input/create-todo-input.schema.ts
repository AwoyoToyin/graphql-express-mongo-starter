const CreateTodoInput = `
  input CreateTodoInput {
    content: String!
  }
`
// add other dependencies in the export
export default () => [CreateTodoInput]

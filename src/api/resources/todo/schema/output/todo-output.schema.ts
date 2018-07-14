import { UserOutput } from '../../../user/schema';

const TodoOutput = `
  type TodoOutput {
    _id: ID
    content: String
    postedBy: UserOutput
    createdAt: String
    updatedAt: String
  }
`
// add other dependencies in the export
export default () => [
    TodoOutput,
    UserOutput,
]

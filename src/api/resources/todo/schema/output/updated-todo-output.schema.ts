import { UserOutput } from '../../../user/schema';

const UpdatedTodo = `
  type UpdatedTodo {
    _id: ID
    content: String
    postedBy: UserOutput
    createdAt: String
    updatedAt: String
  }
`
// add other dependencies in the export
export default () => [
  UpdatedTodo,
  UserOutput,
]

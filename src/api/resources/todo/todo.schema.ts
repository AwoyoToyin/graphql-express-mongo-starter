import { UserOutput } from '../user/schema';

export const Todo = `
  type Todo {
    _id: ID!
    content: String!
    postedBy: UserOutput!
    createdAt: String!
    updatedAt: String!
  }
`
export default () => [
  Todo,
  UserOutput,
]

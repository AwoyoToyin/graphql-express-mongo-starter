import { CreateTodoInput, TodoOutput, UpdatedTodo, UpdateTodoInput } from '../todo/schema';
import Todo from '../todo/todo.schema';
import { AuthPayload, CreateUserInput, UpdatedUser, UpdateUserInput, UserOutput } from '../user/schema';
import User from '../user/user.schema';

const Schema = `
  type Query {
    users: [UserOutput!]!
    allTodos: [Todo!]!
    Todo(_id: ID!): Todo!
  }

  type Mutation {
    updateUser(input: UpdateUserInput!): UpdatedUser!
    signup(input: CreateUserInput!): AuthPayload
    login(username: String!, password: String!): AuthPayload

    createTodo(input: CreateTodoInput!): TodoOutput!
    updateTodo(input: UpdateTodoInput!): UpdatedTodo!
    deleteTodo(_id: ID!): Todo!
  }

  type Subscription {
    newTodo(channelId: ID!): Todo!
  }
`
export default () => [
  Schema,
  Todo,
  User,
  AuthPayload,
  UpdateUserInput,
  CreateUserInput,
  UpdatedUser,
  UserOutput,

  CreateTodoInput,
  UpdateTodoInput,
  TodoOutput,
  UpdatedTodo,
]

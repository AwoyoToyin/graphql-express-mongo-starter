import { PubSub, withFilter } from 'graphql-subscriptions';

import { getAuthenticated, helmet, IContext } from '../../../utils';
import User from '../user/user.connector';
import IUser from '../user/user.interface';
import Todo from './todo.connector';
import ITodo from './todo.interface';

const pubsub = new PubSub()

const todoResolvers = {
    Query: {
        allTodos: helmet(async (_, args, context: IContext) => {
            // Comment out the below code to add authentication
            // const userId = getAuthenticated(context)
            const instance = new Todo()
            const todos = await instance.find<ITodo>()
            return todos
        }),
        Todo: helmet(async (_, { _id }, context: IContext) => {
            // Comment out the below code to add authentication
            // const userId = getAuthenticated(context)
            const instance = new Todo()
            const todo = await instance.findOne<ITodo>(_id)
            return todo
        }),
    },
    Mutation: {
        createTodo: helmet(async (_, args, context: IContext) => {
            const userId = getAuthenticated(context)
            args.userId = userId

            const instance = new Todo()
            const todo = await instance.create<ITodo>(args)

            /**
             * TODO: This should probably be published to either
             * a general room or a particular unique reference
             */
            pubsub.publish('newTodo', { newTodo: todo, channelId: 2 })

            return todo
        }),
    },
    Todo: {
        // Fetch the postedBy if requested by the client
        postedBy: async (parent, __, context: IContext) => {
            const instance = new User()
            const user = await instance.findOne<IUser>(parent.postedBy)
            return user
        },
    },
    Subscription: {
        newTodo: {
            subscribe: withFilter(
                (_, args) => pubsub.asyncIterator('newTodo'),
                (payload, variables) => {
                    return payload.channelId === variables.channelId
                },
            ),
        },
    },
}

export default todoResolvers

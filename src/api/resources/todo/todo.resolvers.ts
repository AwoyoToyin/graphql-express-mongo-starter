import { PubSub, withFilter } from 'graphql-subscriptions';

import { getAuthenticated, helmet, IContext } from '../../../utils';
import { Forbidden, NotFound } from '../../responses';
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
            try {
                // Comment out the below code to add authentication
                // const userId = getAuthenticated(context)
                const instance = new Todo()
                const todo = await instance.findOne<ITodo>(_id)
                return todo
            } catch (err) {
                if (err.path) {
                    throw new NotFound()
                } else {
                    throw err
                }
            }
        }),
    },
    Mutation: {
        createTodo: helmet(async (_, args, context: IContext) => {
            try {
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
            } catch (err) {
                // TODO: find a way to check for specific error thrown
                if (err.path) {
                    throw new Forbidden()
                } else {
                    throw err
                }
            }
        }),
    },
    Todo: {
        // Fetch the postedBy if requested by the client
        postedBy: async (parent, __, context: IContext) => {
            try {
                const instance = new User()
                const user = await instance.findOne<IUser>(parent.postedBy)
                return user
            } catch (err) {
                throw new NotFound()
            }
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

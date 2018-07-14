import { BadRequest, NotFound } from '../../responses/error.reponse';
import { AbstractConnector } from '../shared';
import UserModel from '../user/user.model';
import TodoInterface from './todo.interface';
import TodoModel from './todo.model';

export default class Todo extends AbstractConnector {

    constructor() {
        super(TodoModel)
    }

    public async create<T>(args): Promise<T> {
        const { content, userId } = args

        const user = await UserModel.findOne({ _id: userId })

        const todo = await TodoModel.create({
            content,
            postedBy: user._id,
        })

        await UserModel.findByIdAndUpdate(
            user._id,
            { $addToSet: { todos: { $each: [todo._id] } } },
            { new: true },
        )

        const created: T = await TodoModel.findOne({ _id: todo._id })
        return created
    }

    public async update<T>(args): Promise<T> {
        const { _id, content, userId } = args
        const response = await TodoModel.update(
            { _id, postedBy: userId },
            { $set: { content } },
        )

        if (response.n === 0) {
            throw new NotFound()
        } else if (response.nModified === 0) {
            throw new BadRequest()
        } else {
            const result = await this.findOne<T>({ _id, postedBy: userId })
            return result
        }
    }

    public async delete<T>({ _id, userId }): Promise<T> {
        const response = await UserModel.update(
            { _id: userId },
            { $pull: { todos: { _id } } },
            { multi: true },
        )

        if (response.n === 0) {
            throw new NotFound()
        } else if (response.nModified === 0) {
            throw new BadRequest()
        } else {
            // TODO: find a better logic for returning the deleted resource
            const result = await this.findOne<T>({ _id, postedBy: userId })
            return Object.assign({}, result, { _id })
        }
    }
}

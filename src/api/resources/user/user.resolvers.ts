import { helmet, IContext } from '../../../utils';
import { BadRequest, WrongCredentials } from '../../responses';
import User from './user.connector';
import IUser from './user.interface';

const userResolvers = {
    Query: {
        users: helmet(async (parent, args, context: IContext) => {
            const instance = new User()
            const users = await instance.find<IUser>()
            return users
        }),
    },
    Mutation: {
        updateUser: helmet((_, { input }, context: IContext) => {
            // merge(user, input)
            // return user.save()
        }),
        signup: helmet(async (_, { input }, context: IContext) => {
            try {
                const instance = new User()
                const user = await instance.signup<IUser>(input)
                return user
            } catch (err) {
                throw new BadRequest()
            }
        }),
        login: helmet(async (_, { username, password }, context: IContext) => {
            try {
                const instance = new User()
                const user = await instance.login<IUser>(username, password)
                return user
            } catch (err) {
                throw new WrongCredentials()
            }
        }),
    },

    // User: {
    //   playlists() {
    //     return Playlist.find({}).exec()
    //   }
    // }
}

export default userResolvers

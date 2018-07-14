import * as jwt from 'jsonwebtoken';

import { AbstractConnector } from '..';
import config from '../../../../config';
import { hashPassword, isValidPassword } from '../../../../utils';
import { BadRequest, WrongCredentials } from '../../../responses';

export default abstract class AbstractUserConnector extends AbstractConnector {

    /**
     * Sign up a user
     * @param args object
     * @returns Promise<T>
     */
    public async signup<T>(args: any): Promise<T> {
        const username = args.username
        // TODO: This should accept multiple query
        const entity = await this.model.findOne({ username }).lean()

        if (entity && entity._id) {
            throw new BadRequest()
        }

        const _password = await hashPassword(args.password)

        const user: any = await new this.model({ ...args, password: _password }).save()

        user.token = jwt.sign({ userId: user._id }, config.secrets.JWT_SECRET)
        return user
    }

    /**
     * Log user in
     * @param username String
     * @param password String
     * @returns Promise<T>
     */
    public async login<T>(username: string, password: string): Promise<T> {
        const entity: any = await this.model.findOne({ username }).lean()

        if (!entity && !entity._id) {
            throw new WrongCredentials()
        }

        const valid = await isValidPassword(entity.password, password)
        if (!valid) {
            throw new WrongCredentials()
        }

        // remove password from user entity object which will be returned
        entity.password = undefined

        entity.token = jwt.sign({ userId: entity._id }, config.secrets.JWT_SECRET)
        return entity
    }
}

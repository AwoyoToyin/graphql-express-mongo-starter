import * as bcrypt from 'bcryptjs';
import * as Hashids from 'hashids';
import * as jwt from 'jsonwebtoken';

import { BadRequest, Forbidden, ServerError } from './api/responses/error.reponse';
import config from './config';

export function getAuthenticated(context: IContext): string {
    const Authorization = context.request.get('Authorization')
    if (!Authorization) {
        throw new Forbidden()
    }

    const token = Authorization.replace('Bearer ', '')
    // @ts-ignore
    const { userId } = jwt.verify(token, config.secrets.JWT_SECRET)
    return userId

}

export function hashPassword(password: string): Promise<string> {
    if (!password) {
        throw new BadRequest({ data: { reason: 'You must supply a password' } })
    }
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hash(password, salt)
}

export function isValidPassword(oldPassword: string, newPassword: string): Promise<boolean> {
    return bcrypt.compare(newPassword, oldPassword)
}

export const helmet = (resolver) => async (...args) => {
    try {
        /** Try to execute the actual resolver and return the result immediately */
        return await resolver(...args)
    } catch (err) {
        if (err.path) {
            throw new ServerError({ data: { reason: err.message } })
        } else {
            throw err
        }
    }
}

export function obscure(value: any) {
    const hashids = new Hashids('somesecretehash')
    return hashids.encodeHex(value)
}

export function decode(obscured: string) {
    const hashids = new Hashids('somesecretehash')
    return hashids.decode(obscured)
}

export interface IContext {
    request: any
    pubsub: any
    connectors: any
}

import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { hashPassword, isValidPassword, obscure } from '../../../utils';
import { BadRequest } from '../../responses/error.reponse';

const Schema = mongoose.Schema

/**
 * TODO: Create a seperate model for handling initial registration
 * Which will serve as a temporary holder for join requests
 * On account confirmation, the riders record would then be created
 */
const UserSchema = new Schema({
    reference: {
        type: String,
        index: true,
    },
    firstname: {
        type: String,
        required: [true, 'firstname is required'],
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required'],
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'username is required'],
        match: [/^[a-zA-Z0-9]+$/, 'supplied username is invalid'],
        index: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'email is required'],
        match: [/\S+@\S+\.\S+/, 'supplied email is invalid'],
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'phone is required'],
        // match: [/^(\+234|([0]{1})([7-9]{1})([0|1]{1}))([0-9]{6,14})$/, 'is invalid'],
    },
    password: {
        required: [true, 'password is required'],
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
        index: true,
    },
}, { timestamps: true })

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

UserSchema.post('validate', (doc) => {
    if (!doc.reference) {
        doc.reference = obscure(doc._id)
    }
});

UserSchema.methods = {
    authenticate(plaintTextPassword): Promise<boolean> {
        return isValidPassword(plaintTextPassword, this.password)
    },
    hashPassword(plaintTextPassword): Promise<string> {
        if (!plaintTextPassword) {
            throw new BadRequest({ data: { reason: 'You must supply a password' } })
        }

        return hashPassword(plaintTextPassword)
    },
}

const User = mongoose.model('user', UserSchema)

export default User

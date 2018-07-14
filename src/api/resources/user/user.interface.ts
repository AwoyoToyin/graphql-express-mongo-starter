import Node from '../shared/interface/node.interface'

interface IUser extends Node {
    _id?: string
    username?: string
    password?: string
    token?: string
    reference?: string
    firstname?: string
    lastname?: string
    email?: string
    phone?: string
    active?: boolean
    createdAt?: string
    updatedAt?: string
}

export default IUser

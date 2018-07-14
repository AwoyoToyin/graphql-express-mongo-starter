import IUser from '../user/user.interface'

export default interface ITodo {
    _id?: string
    // reference?: string
    content?: string
    postedBy?: IUser
    createdAt?: string
    updatedAt?: string
}

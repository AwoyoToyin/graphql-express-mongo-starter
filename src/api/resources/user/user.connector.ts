import { AbstractUserConnector } from '../shared';
import UserModel from './user.model';

export default class User extends AbstractUserConnector {

    constructor() {
        super(UserModel)
    }
}

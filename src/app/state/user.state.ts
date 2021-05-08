import { User } from '../models/user';

export interface UserState {
    userProfile: User;
    isUserLoggedIn: boolean;
}

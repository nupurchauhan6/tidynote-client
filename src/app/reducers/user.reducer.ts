import * as UserActions from '../actions/user.action';
import { Action, createReducer, on } from '@ngrx/store';
import { UserState } from '../state/user.state';

export const initialState: UserState = {
    userProfile: {
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: ''
    },
    isUserLoggedIn: false
};

const reducer = createReducer(
    initialState,
    on(UserActions.loginSuccess, (state, action) => ({
        ...state,
        userProfile: action.userProfile,
        isUserLoggedIn: true
    }))
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
    return reducer(state, action);
}

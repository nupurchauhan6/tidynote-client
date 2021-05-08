import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const loginUser = createAction(
    '[Login Page] Login',
    props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Login Success] User Loaded Success',
    props<{ userProfile: User }>()
);

export const loginFailure = createAction(
    '[Login Failure] Authentication Faiure',
    props<{ error: any }>()
);

export const registerUser = createAction(
    '[Register Page] User Register',
    props<{ userProfile: User }>()
);

export const registerSuccess = createAction(
    '[Register Success] User Registered Successfully',
    props<{ userProfile: User }>()
);

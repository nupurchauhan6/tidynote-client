import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

const userProfileState = (state: AppState) => state.user.userProfile;
const userState = (state: AppState) => state.user;

export const getUserID = createSelector(
    userProfileState,
    (state) => state.userId
);

export const getFullName = createSelector(
    userProfileState,
    (state) => state.firstName + ' ' + state.lastName
);

export const getLoginStatus = createSelector(
    userState,
    (state) => state.isUserLoggedIn
);

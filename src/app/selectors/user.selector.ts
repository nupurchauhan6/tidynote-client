import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

const userProfileState = (state: AppState) => state.user.userProfile;

export const getUserID = createSelector(
    userProfileState,
    (state) => state.userId
);

export const getFullName = createSelector(
    userProfileState,
    (state) => state.firstName + ' ' + state.lastName
);

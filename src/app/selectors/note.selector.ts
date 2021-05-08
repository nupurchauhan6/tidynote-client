import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

const noteState = (state: AppState) => state.notes;

export const getNotes = createSelector(
    noteState,
    (state) => state.allNotes
);

import * as NoteActions from '../actions/note.action';
import { Action, createReducer, on } from '@ngrx/store';
import { NoteState } from '../state/note.state';

export const initialState: NoteState = {
    allNotes: []
};

const reducer = createReducer(
    initialState,
    on(NoteActions.loadNotesSuccess, (state, action) => ({
        ...state,
        allNotes: action.notes
    })),
    on(NoteActions.addNoteSuccess, (state, action) => ({
        ...state,
        allNotes: [...state.allNotes, action.newNote]
    }))
);


export function noteReducer(state: NoteState | undefined, action: Action): NoteState {
    return reducer(state, action);
}

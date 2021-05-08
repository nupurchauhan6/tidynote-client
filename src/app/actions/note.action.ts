import { createAction, props } from '@ngrx/store';
import { Note } from '../models/note';

export const loadNotes = createAction(
    '[Load Notes] Load Notes',
    props<{ userId: string }>()
);

export const loadNotesSuccess = createAction(
    '[Load Notes Success] Load Notes Success',
    props<{ notes: Note[] }>()
);

export const loadNotesFailure = createAction(
    '[Load Notes Failure] Load Notes Failure',
    props<{ error: string }>()
);

export const addNote = createAction(
    '[Add New] Add New Note',
    props<{ newNote: Note }>()
);

export const addNoteSuccess = createAction(
    '[Added Success] Add Note Success',
    props<{ newNote: Note }>()
);

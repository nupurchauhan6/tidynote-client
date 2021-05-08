import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as NoteActions from '../actions/note.action';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';

@Injectable()
export class NoteEffects {

    loadNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NoteActions.loadNotes),
            exhaustMap(action =>
                this.noteService.getAllNotes(action.userId).pipe(
                    map((notes: Note[]) => {
                        return NoteActions.loadNotesSuccess({ notes: notes });
                    }),
                    catchError((error) => {
                        return of(NoteActions.loadNotesFailure({ error: 'Server error found!' }));
                    })
                )
            )
        )
    );

    addNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NoteActions.addNote),
            exhaustMap(action =>
                this.noteService.addNote(action.newNote).pipe(
                    map((note: Note) => {
                        return NoteActions.addNoteSuccess({ newNote: note });
                    }),
                    catchError((error) => {
                        return of(NoteActions.loadNotesFailure({ error: 'Server error found!' }));
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private noteService: NoteService
    ) { }
}

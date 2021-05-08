import { NoteState } from './note.state';
import { UserState } from './user.state';

export interface AppState {
    user: UserState;
    notes: NoteState;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public static GET_ALL_NOTES = 'api/notes/getAll/';
  public static ADD_NOTE = 'api/notes/addNote';

  constructor(private httpClient: HttpClient) { }

  getAllNotes(userId: string): Observable<any> {
    return this.httpClient.get(NoteService.GET_ALL_NOTES + userId);
  }

  addNote(newNote: Note): Observable<any> {
    return this.httpClient.post(NoteService.ADD_NOTE, newNote);
  }
}

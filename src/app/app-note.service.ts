import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridService } from './grid/grid.service';

@Injectable({
  providedIn: 'root'
})
export class AppNoteService {

  public static GET_ALL_URL = 'api/getAll';
  public static ADD_NOTE = 'api/addNote';
  constructor(private httpClient: HttpClient, private gridService: GridService) { }

  getAllNotes() {
    return this.httpClient.get(AppNoteService.GET_ALL_URL);
  }

  addNote(newNote: any) {
    this.httpClient.post(AppNoteService.ADD_NOTE, newNote).subscribe(
      data => {
        if (data) {
          this.gridService.addNewRow(data);
        }
      }
    );
  }

}

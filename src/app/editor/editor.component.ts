import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { Note } from '../models/note';
import * as UserSelectors from '../selectors/user.selector';
import * as NoteActions from '../actions/note.action';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  public title: string;
  public content: string;
  public readOnly: boolean;
  @ViewChild('editor', { static: false }) editor: TemplateRef<QuillEditorComponent>;
  public modules: QuillModule;
  private userId: string;

  constructor(public modalRef: BsModalRef, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(UserSelectors.getUserID).subscribe(userId => {
      this.userId = userId;
    });
  }

  onSaveClick(): void {
    const currentDate = new Date();
    const newNote: Note = {
      content: this.content,
      title: this.title,
      noteId: this.userId + '_' + currentDate.getTime(),
      createdDate: currentDate.toLocaleString(),
      updatedDate: currentDate.toLocaleString(),
      userId: this.userId
    };
    this.store.dispatch(NoteActions.addNote({ newNote: newNote }));
  }

}

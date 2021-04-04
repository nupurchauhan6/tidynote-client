import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QuillModule } from 'ngx-quill';
import { AppNoteService } from '../app-note.service';
import { EditorService } from '../editor/editor.service';

export interface INote {
  id?: string;
  title?: string;
  content?: string | null;
  createdDate?: string;
  updatedDate?: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public title: string;
  public modalContent: INote = {};
  public editorContent: string;
  public readOnly: boolean = false;
  public modules: QuillModule;
  
  constructor(public modalRef: BsModalRef, private editorService: EditorService, private appService: AppNoteService) { }

  ngOnInit(): void {
    this.editorService.getEditorContent().subscribe(
      content => {
        this.editorContent = content;
      }
    )
  }

  onSaveClick() {
    this.modalContent.content = this.editorContent;
    this.modalContent.title = this.title;
    this.modalContent.id = '12';
    this.modalContent.createdDate = this.modalContent.updatedDate = new Date().toLocaleString();
    this.appService.addNote(this.modalContent);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  public editorContent: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor() { }

  getEditorContent() {
    return this.editorContent.asObservable();
  }

  setEditorContent(editorContent: string) {
    this.editorContent.next(editorContent);
  }
}

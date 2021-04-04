import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ContentChange, QuillEditorComponent, QuillModule } from 'ngx-quill';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnChanges {

  @Input() public content: string;
  @Input() public readOnly: boolean;
  @ViewChild('editor', { static: false }) editor: TemplateRef<QuillEditorComponent>;
  @Input() public modules: QuillModule;

  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onContentChanged(event: ContentChange) {
    if (event.html) {
      this.content = event.html;
      this.editorService.setEditorContent(this.content);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { IconRendererComponent } from './icon-renderer.component';
import { faFileDownload, faBookReader, faTrashAlt, faEdit, faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditorComponent } from '../editor/editor.component';
import { MODAL_CONFIG } from '../app.constant';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../selectors/user.selector';
import * as NoteActions from '../actions/note.action';
import * as NoteSelectors from '../selectors/note.selector';

export const Action = {
  READ: 'Read',
  CLONE: 'Clone',
  DELETE: 'Delete',
  DOWNLOAD: 'Download',
  EDIT: 'Edit',
  SHARE: 'Share'
};

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  private gridApi: GridApi;
  private gridColumnApi: any;

  public columnDefs: ColDef[] = [
    {
      headerName: 'Title', field: 'title',
      filter: true,
      sortable: true
    },
    {
      headerName: 'Date Created', field: 'createdDate',
      filter: true,
      sortable: true
    },
    {
      headerName: 'Last Updated', field: 'updatedDate',
      filter: true,
      sortable: true
    },
    {
      headerName: 'Read', cellRenderer: 'iconRenderer',
      cellRendererParams: {
        icon: faBookReader
      }
    },
    {
      headerName: 'Delete', cellRenderer: 'iconRenderer',
      cellRendererParams: {
        icon: faTrashAlt
      }
    },
    {
      headerName: 'Edit', cellRenderer: 'iconRenderer',
      cellRendererParams: {
        icon: faEdit
      }
    },
    {
      headerName: 'Clone', cellRenderer: 'iconRenderer',
      cellRendererParams: {
        icon: faCopy
      }
    },
    {
      headerName: 'Share', cellRenderer: 'iconRenderer',
      cellRendererParams: {
        icon: faEnvelope
      }
    },
    {
      headerName: 'Download', cellRenderer: 'iconRenderer',
      cellRendererParams: {
        icon: faFileDownload
      }
    }
  ];

  public rowData: any;

  public gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      cellRendererParams: {
        onClick: this.onIconClick.bind(this)
      }
    },
    frameworkComponents: {
      iconRenderer: IconRendererComponent
    }
  };
  private bsModalRef: BsModalRef;
  private userId: string;

  constructor(private modalService: BsModalService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(UserSelectors.getUserID).subscribe(userId => {
      if (userId) {
        this.userId = userId;
        this.store.dispatch(NoteActions.loadNotes({ userId: this.userId }));
      }
    });

    this.store.select(NoteSelectors.getNotes).subscribe(notes => {
      this.rowData = notes;
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onIconClick(params: any): void {
    switch (params.action) {
      case Action.READ:
        this.bsModalRef = this.modalService.show(EditorComponent, MODAL_CONFIG);
        this.bsModalRef.content.content = params.rowData.content;
        this.bsModalRef.content.title = params.rowData.title;
        this.bsModalRef.content.readOnly = true;
        this.bsModalRef.content.modules = { toolbar: false };
        break;
      case Action.EDIT:
        this.bsModalRef = this.modalService.show(EditorComponent, MODAL_CONFIG);
        this.bsModalRef.content.content = params.rowData.content;
        this.bsModalRef.content.title = params.rowData.title;
        this.bsModalRef.content.readOnly = false;
        this.bsModalRef.content.modules = { toolbar: true };
        break;
      case Action.CLONE:
        break;
      case Action.DELETE:
        break;
      case Action.SHARE:
        break;
      case Action.DOWNLOAD:
        break;
      default:
        break;
    }
  }

}

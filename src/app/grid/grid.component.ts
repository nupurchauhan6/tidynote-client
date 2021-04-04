import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { AppNoteService } from '../app-note.service';
import { GridService } from './grid.service';
import { IconRendererComponent } from './icon-renderer.component';
import { faFileDownload, faBookReader, faTrashAlt, faEdit, faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';

export const Action = {
  READ: "Read",
  CLONE: "Clone",
  DELETE: "Delete",
  DOWNLOAD: "Download",
  EDIT: "Edit",
  SHARE: "Share"
}

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
      'iconRenderer': IconRendererComponent
    }
  }
  private bsModalRef: BsModalRef;

  constructor(private gridService: GridService, private appService: AppNoteService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.appService.getAllNotes().subscribe(
      data => {
        if (data) {
          this.rowData = data;
        }
      }
    );

    this.gridService.updateGrid().subscribe(
      data => {
        if (data && this.gridApi) {
          this.rowData.push(data);
          this.gridApi.setRowData(this.rowData);
        }
      }
    );
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onIconClick(params: any) {
    switch (params.action) {
      case Action.READ:
        this.bsModalRef = this.modalService.show(ModalComponent);
        this.bsModalRef.content.editorContent = params.rowData.content;
        this.bsModalRef.content.title = params.rowData.title;
        this.bsModalRef.content.readOnly = true;
        this.bsModalRef.content.modules = { toolbar: false };
        break;
      case Action.EDIT:
        this.bsModalRef = this.modalService.show(ModalComponent);
        this.bsModalRef.content.editorContent = params.rowData.content;
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

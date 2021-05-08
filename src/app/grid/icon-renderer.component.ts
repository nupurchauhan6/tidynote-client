import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-button-renderer',
    styles: ['.grid-icon { color: #007bff; cursor: pointer; font-size:medium; display:block; text-align:right }'],
    template: `<fa-icon [icon]="icon" class="grid-icon" (click)="onClick()"></fa-icon>`
})

export class IconRendererComponent implements ICellRendererAngularComp {

    private params: any;
    public icon: any;

    agInit(params: any): void {
        this.params = params;
        this.icon = params.icon;
    }

    refresh(params: ICellRendererParams): boolean {
        return true;
    }

    onClick(): void {
        if (this.params.onClick instanceof Function) {
            const params = {
                action: this.params.colDef.headerName,
                rowData: this.params.node.data
            };
            this.params.onClick(params);
        }
    }
}

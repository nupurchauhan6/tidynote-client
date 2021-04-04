import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private modalData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }

  updateGrid() {
    return this.modalData.asObservable();
  }

  addNewRow(modalData: any) {
    this.modalData.next(modalData);
  }
}

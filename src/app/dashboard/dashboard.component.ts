import { Component, OnInit } from '@angular/core';
import { faBars, faCog, faSignOutAlt, faToggleOn, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MODAL_CONFIG } from '../app.constant';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public settingIcon: IconDefinition = faCog;
  public profileIcon: IconDefinition = faUser;
  public toggleIcon: IconDefinition = faBars;
  public logoutIcon: IconDefinition = faSignOutAlt;

  public openSlide = true;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openEditorModal(): void {
    this.modalService.show(EditorComponent, MODAL_CONFIG);
  }

  toggleButton(): void {
    this.openSlide = !this.openSlide;
  }

}

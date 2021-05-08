import { Component, OnInit } from '@angular/core';
import { faBars, faCog, faSignOutAlt, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MODAL_CONFIG, TOASTR_CONFIG } from '../app.constant';
import { EditorComponent } from '../editor/editor.component';
import { AppState } from '../state/app.state';
import * as UserSelectors from '../selectors/user.selector';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public menuItems = [
    { name: "Profile", icon: faUser },
    { name: "Settings", icon: faCog },
    { name: "Log Out", icon: faSignOutAlt }
  ]
  public toggleIcon: IconDefinition = faBars;

  public toggleSideBar = true;

  constructor(private modalService: BsModalService, private store: Store<AppState>, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.store.select(UserSelectors.getLoginStatus).subscribe(status => {
      if (!status) {
        this.toastr.error('Authentication Failed', 'Please login.', TOASTR_CONFIG);
      }
    });
  }

  openEditorModal(): void {
    this.modalService.show(EditorComponent, MODAL_CONFIG);
  }

  toggleButton(): void {
    this.toggleSideBar = !this.toggleSideBar;
  }

}

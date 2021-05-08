import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import * as UserActions from '../actions/user.action';
import * as UserSelectors from '../selectors/user.selector';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  constructor(private store: Store<AppState>, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.store.select(UserSelectors.getUserID).subscribe(id => {
      if (id) {
        console.log('Logged in with username ', id);
      }
    });
  }

  getUserProfile(): void {
    this.spinner.show();
    this.store.dispatch(UserActions.loginUser({ username: this.username, password: this.password }));
  }

}

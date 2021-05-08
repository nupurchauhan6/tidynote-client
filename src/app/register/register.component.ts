import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../models/user';
import * as CryptoJS from 'crypto-js';
import * as UserActions from '../actions/user.action';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public mobile: string;
  public password: string;
  public confirmPassword: string;

  constructor(public modalRef: BsModalRef, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const userReq: User = {
      userId: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobile,
      password: CryptoJS.AES.encrypt(this.password.trim(), 'tidynote@143').toString()
    };
    this.store.dispatch(UserActions.registerUser({ userProfile: userReq }));
  }

}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from '../actions/user.action';
import { of } from 'rxjs';
import { User } from '../models/user';
import { TOASTR_CONFIG } from '../app.constant';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserEffects {

    loadUserProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginUser),
            exhaustMap(action =>
                this.userService.getUserProfile(action.username).pipe(
                    map((user: User) => {
                        let descryptedPassword;
                        if (user.password) {
                            descryptedPassword = CryptoJS.AES.decrypt(user.password, 'tidynote@143').toString(CryptoJS.enc.Utf8);
                        }
                        if (descryptedPassword === action.password) {
                            this.toastr.success('Password verfied! You are logged in.', 'Successful login.', TOASTR_CONFIG);
                            this.router.navigateByUrl('/dashboard');
                        } else {
                            this.toastr.error('Password is wrong!', 'Authentication failed.', TOASTR_CONFIG);
                            return UserActions.loginFailure({ error: 'Error Occured' });
                        }
                        return UserActions.loginSuccess({ userProfile: user });
                    }),
                    catchError(error => {
                        this.toastr.error('Please try again!', 'Server Error.', TOASTR_CONFIG);
                        return of(UserActions.loginFailure({ error: 'Server Error Occured' }));
                    })
                )
            )
        )
    );

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.registerUser),
            exhaustMap(action =>
                this.userService.addUser(action.userProfile).pipe(
                    map((user: User) => {
                        this.toastr.success('Your account is successfully created with user name ' + user.userId,
                            'Successful registration.', TOASTR_CONFIG);
                        return UserActions.registerSuccess({ userProfile: user });
                    }),
                    catchError(error => {
                        this.toastr.error('Please try again!', 'Server Error.', TOASTR_CONFIG);
                        return of(UserActions.loginFailure({ error: 'Server Error Occured' }));
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private toastr: ToastrService,
        private router: Router
    ) { }
}

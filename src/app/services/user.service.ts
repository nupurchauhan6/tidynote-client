import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public static ADD_USER = 'api/users/addUser';
  public static GET_USER_PROFILE = 'api/users/getUserProfile/';

  constructor(private httpClient: HttpClient) { }

  getUserProfile(userId: string): Observable<any> {
    return this.httpClient.get(UserService.GET_USER_PROFILE + userId);
  }

  addUser(userReq: User): Observable<any> {
    return this.httpClient.post(UserService.ADD_USER, userReq);
  }
}

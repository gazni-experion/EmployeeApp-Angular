import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
/*
  //get username and password from login form
  getUserByPassword(user: User): Observable<any> { 
    console.log(user.UserName);   //username
    console.log(user.UserPassword);   //password
    return this.httpClient.get(environment.roleUrl + '/api/users/login?username=' + user.UserName + '&password=' + user.UserPassword);
  }*/

  //Second way
  public loginVerify(user: User) {
    
    //calling web service and calling username and password
    console.log(user);
    console.log("Getting from api");
    return this.httpClient.get(environment.roleUrl + '/api/users/login?username=' + user.UserName + '&password=' + user.UserPassword);
  }

  public logout() {
    localStorage.removeItem('ACCESSROLE');
    localStorage.removeItem('USERNAME');
    sessionStorage.removeItem('USERNAME');
  }
}

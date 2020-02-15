
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn$: Subject<boolean> = new Subject<boolean>();
  role$: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient, private storage: LocalStorageService, private router: Router) { }

  createUser(user: User) {
    const headers = {
      'Content-type': 'application/json'
    };
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:8081/users/new', body, { headers }
    ).pipe(map((res: Response) => {
    }));
  }

  addUserDetails(user: User) {
    const headers = {
      'Content-type': 'application/json'
    };
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:8081/userDetails/addUserDetails', body, { headers }
    ).pipe(map((res: Response) => {
    }));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<Array<User>>('http://localhost:8081/users/users', { responseType: 'json' });
  }

  getAllUserDetails(): Observable<User[]> {
    return this.http.get<Array<User>>('http://localhost:8081/userDetails/all', { responseType: 'json' });
  }

  login(username: string) {
    return this.http.get<User>('http://localhost:8081/users/user/' + username, { responseType: 'json' });
  }

  deleteUser(userid: number) {
    return this.http.delete('http://localhost:8081/users/' + userid, { responseType: 'json' });
  }

  setRole(value: string) {

    this.storage.set('role', value);
    this.role$.next(value);

  }
  setLoggedIn(value: boolean) {
    if (value) {
      this.storage.set('loggedIn', 'true');
      this.loggedIn$.next(value);
    }
    else this.storage.set('loggedIn', 'false')
  }
  Role() { return JSON.parse(this.storage.get('admin')); }
  LoggedIn() { return JSON.parse(this.storage.get('loggedIn')); }

 signOut(){
   if(this.LoggedIn()){
      localStorage.clear();
      this.router.navigate(['/home']);
      window.alert("You are logged out.");
    }
  }
}







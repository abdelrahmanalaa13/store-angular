import { Injectable } from '@angular/core';
// import { Role } from './roles.type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly adminCredentials = {
    username: 'admin',
    password: 'admin',
  };
  private readonly userCredentials = {
    username: 'user',
    password: 'user',
  };
  ADMIN = 'admin';
  USER = 'user';
  currentUserSubject: BehaviorSubject<string> = new BehaviorSubject('');
  loginObservable: Observable<string> = new Observable();
  constructor() {}

  login(username: string, password: string) {
    if (
      username === this.adminCredentials.username &&
      password === this.adminCredentials.password
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      this.currentUserSubject.next(this.ADMIN);
    } else if (
      username === this.userCredentials.username &&
      password === this.userCredentials.password
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      this.currentUserSubject.next(this.USER);      
    }
    return this.currentUserSubject.asObservable();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

    localStorage.setItem('isLoggedIn', 'false');
    this.currentUserSubject.next('');
  }

  isLoggedIn(): boolean {
    return Boolean(this.currentUserSubject.value);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  currentUserSubject$: BehaviorSubject<string> = new BehaviorSubject('');
  isLoggedInSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (
      username === this.adminCredentials.username &&
      password === this.adminCredentials.password
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', this.ADMIN);
      this.currentUserSubject$.next(this.ADMIN);
    } else if (
      username === this.userCredentials.username &&
      password === this.userCredentials.password
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', this.USER);
      this.currentUserSubject$.next(this.USER);
    }
    this.isLoggedInSubject$.next(Boolean(this.currentUserSubject$.value));
    return this.currentUserSubject$.asObservable();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
    this.currentUserSubject$.next('');
    this.isLoggedInSubject$.next(false);

    this.router.navigate(['/login']);
  }

  checkLoggedIn() {
    return this.isLoggedInSubject$.asObservable();
  }

  getCurrentRole() {
    if (this.isLoggedIn()) {
      this.isLoggedInSubject$.next(true);
      if (this.currentUserSubject$.value) {
        return this.currentUserSubject$.value;
      } else {
        const userRole = localStorage.getItem('currentUser') || '';
        this.currentUserSubject$.next(userRole);
        return userRole;
      }
    } else {
      this.isLoggedInSubject$.next(false);
      return '';
    }
  }
  isLoggedIn(): boolean {
    return (
      Boolean(this.currentUserSubject$.value) ||
      localStorage.getItem('isLoggedIn') === "true"
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JWTToken, LoginInput } from '../models/auth.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: Observable<JWTToken> | null = null;
  private currentUserSubject: BehaviorSubject<JWTToken | null> =
    new BehaviorSubject<JWTToken | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  get currentUserValue(): JWTToken | null {
    if (!this.currentUserSubject.value) {
      this.currentUserSubject = new BehaviorSubject<JWTToken | null>(
        JSON.parse(localStorage.getItem('currentUser') || 'null')
      );
    }
    return this.currentUserSubject.value;
  }

  login(loginInput: LoginInput) {
    return this.http
      .post<JWTToken>(`${environment.backendUrl}/auth/login`, loginInput)
      .pipe(
        tap((user) => {
          if (user && user.access_token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}

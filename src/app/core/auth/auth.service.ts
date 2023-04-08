import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  JWTToken,
  LoginInput,
  RecoverInput,
  RegisterInput,
} from '../models/auth.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageOutput } from '../models/message.model';
import { ToastService } from '../toast/toast.service';
import iziToast from 'izitoast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: Observable<JWTToken> | null = null;
  private currentUserSubject: BehaviorSubject<JWTToken | null> =
    new BehaviorSubject<JWTToken | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toastService: ToastService
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

  register(registerInput: RegisterInput) {
    delete registerInput.passwordConfirmation;
    return this.http
      .post<MessageOutput>(
        `${environment.backendUrl}/auth/signUp`,
        registerInput
      )
      .pipe(
        tap((response) => {
          this.toast(response);
        })
      );
  }

  confirmEmail(confirmationToken: string) {
    return this.http
      .post<MessageOutput>(`${environment.backendUrl}/auth/confirmEmail`, {
        confirmationToken,
      })
      .pipe(
        tap((response) => {
          this.toast(response);
        })
      );
  }

  sendRecoverPasswordMail({ email }: { email: string }) {
    return this.http
      .post<MessageOutput>(
        `${environment.backendUrl}/auth/sendRecoverPasswordMail`,
        {
          email,
        }
      )
      .pipe(
        tap((response) => {
          this.toast(response);
        })
      );
  }

  recoverPassword(recoverInput: RecoverInput) {
    delete recoverInput.passwordConfirmation;
    return this.http
      .post<MessageOutput>(
        `${environment.backendUrl}/auth/recoverPassword`,
        recoverInput
      )
      .pipe(
        tap((response) => {
          this.toast(response);
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  toast({ message, success }: MessageOutput) {
    if (success) {
      this.toastService.success(message);
    } else {
      this.toastService.error(message);
    }
  }
}

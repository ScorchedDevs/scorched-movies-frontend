import { Component } from '@angular/core';
import { JWTToken } from './core/models/auth.model';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly authService: AuthService) {}

  get isLoggedIn(): boolean {
    const currentUser: JWTToken | null = this.authService.currentUserValue;
    return Boolean(currentUser);
  }

  logout() {
    this.authService.logout();
  }
}

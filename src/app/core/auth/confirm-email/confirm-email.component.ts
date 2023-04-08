import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  confirmationToken!: string;

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.confirmationToken = params['token'] || '';
    });
  }

  onSubmit() {
    this.authService.confirmEmail(this.confirmationToken).subscribe({
      complete: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}

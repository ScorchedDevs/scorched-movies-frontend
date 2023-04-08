import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoverInput } from '../../models/auth.model';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
  recoveryToken!: string;
  recoverForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.recoverForm = this.formBuilder.group({
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.recoveryToken = params['token'] || '';
    });
  }

  onSubmit() {
    if (!this.recoverForm.valid) {
      return;
    }

    const submitValues: RecoverInput = this.recoverForm.value;

    if (submitValues.password != submitValues.passwordConfirmation) {
      console.log('nope');
      return;
    }

    submitValues.recoveryToken = this.recoveryToken;

    this.authService.recoverPassword(submitValues).subscribe({
      complete: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastService.error(error.error.message);
      },
    });
  }
}

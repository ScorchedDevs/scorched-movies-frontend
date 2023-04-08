import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterInput } from '../../models/auth.model';
import { subscribeOn } from 'rxjs';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  returnUrl!: string;
  registerForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, Validators.required],
      name: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/list';
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    const submitValues: RegisterInput = this.registerForm.value;

    if (submitValues.password != submitValues.passwordConfirmation) {
      this.toastService.error("The password don't match");
      return;
    }

    this.authService.register(submitValues).subscribe({
      complete: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastService.error(error.error.message);
      },
    });
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  private convertQueryParamsStringToJSON(queryParamnsString: string): Object {
    return Object.fromEntries(new URLSearchParams(queryParamnsString));
  }
}

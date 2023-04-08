import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JWTToken, LoginInput } from '../../models/auth.model';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl!: string;
  loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.redirectHomeIfLoggendIn();
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/list';
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const submitValues: LoginInput = this.loginForm.value;

    console.log(submitValues);

    this.authService.login(submitValues).subscribe({
      complete: () => {
        const [returnRoute, returnParams] = this.returnUrl.split('?');

        const queryParams = this.convertQueryParamsStringToJSON(returnParams);

        this.toastService.success('Login efetuado com sucesso');

        this.router.navigate([returnRoute], { queryParams });
      },
      error: (error) => {
        this.toastService.error(error.error.message);
      },
    });
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  private redirectHomeIfLoggendIn() {
    const currentUser: JWTToken | null = this.authService.currentUserValue;
    if (currentUser) {
      this.router.navigate(['/list']);
    }
  }

  private convertQueryParamsStringToJSON(queryParamnsString: string): Object {
    return Object.fromEntries(new URLSearchParams(queryParamnsString));
  }
}

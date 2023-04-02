import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JWTToken, LoginInput } from '../../models/auth.model';

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
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.redirectHomeIfLoggendIn();
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/home';
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const submitValues: LoginInput = this.loginForm.value;

    this.authService.login(submitValues).subscribe({
      complete: () => {
        const [returnRoute, returnParams] = this.returnUrl.split('?');

        const queryParams = this.convertQueryParamsStringToJSON(returnParams);

        this.router.navigate([returnRoute], { queryParams });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private redirectHomeIfLoggendIn() {
    const currentUser: JWTToken | null = this.authService.currentUserValue;
    if (currentUser) {
      this.router.navigate(['/home']);
    }
  }

  private convertQueryParamsStringToJSON(queryParamnsString: string): Object {
    return Object.fromEntries(new URLSearchParams(queryParamnsString));
  }
}

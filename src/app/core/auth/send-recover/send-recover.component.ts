import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './send-recover.component.html',
  styleUrls: ['./send-recover.component.scss'],
})
export class SendRecoverComponent implements OnInit {
  returnUrl!: string;
  sendRecoverForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.sendRecoverForm = this.formBuilder.group({
      email: [null, Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/list';
    });
  }

  onSubmit() {
    if (!this.sendRecoverForm.valid) {
      return;
    }

    const submitValues: { email: string } = this.sendRecoverForm.value;

    this.authService.sendRecoverPasswordMail(submitValues).subscribe({
      complete: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastService.error(error.error.message);
      },
    });
  }
}

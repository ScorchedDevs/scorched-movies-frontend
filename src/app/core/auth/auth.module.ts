import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SendRecoverComponent } from './send-recover/send-recover.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ConfirmEmailComponent, RecoverPasswordComponent, SendRecoverComponent],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}

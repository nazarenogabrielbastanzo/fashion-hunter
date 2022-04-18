import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { SessionComponent } from './session.component';
import { LoginComponent } from './login/login.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordTokenComponent } from './reset-password-token/reset-password-token.component';


@NgModule({
  declarations: [
    SessionComponent,
    LoginComponent,
    CrearCuentaComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ResetPasswordTokenComponent
  ],
  imports: [
    CommonModule,
    SessionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SessionModule { }

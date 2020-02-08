import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
    ],
})
export class AuthModule {}

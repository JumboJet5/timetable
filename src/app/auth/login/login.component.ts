import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../static/schedule-widget/assets/stylesheet/default-form.scss',
    './login.component.scss',
  ],
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  public isPasswordVisible = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  public login() {
    this.authService.login(this.loginForm.value)
      .subscribe(result => result ? this.router.navigate([
        'schedule-widget',
        'dashboard',
        'lessons-schedule',
        'groupSlug',
        'groupId',
      ]) : this.loginForm.reset(), () => this.loginForm.reset());
  }

  public isControlValid(formGroup: FormGroup, controlName: string, control?: AbstractControl): boolean {
    control = control || (formGroup ? formGroup.get(controlName) : undefined);
    return control && (control.valid || control.untouched);
  }

  public getControlError(formGroup: FormGroup, controlName: string): string {
    const control = formGroup ? formGroup.get(controlName) : undefined;
    return this.isControlValid(formGroup, controlName, control) ? '' : control.errors.custom;
  }
}

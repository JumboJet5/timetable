import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormatService } from 'src/app/service/format/format.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        '../../../assets/stylesheet/default-form.scss',
        './login.component.scss',
    ],
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });
    public isPasswordVisible = false;

    constructor(private authService: AuthService,
                private router: Router,
                public formatService: FormatService) {
    }

    ngOnInit() {
    }

    public login() {
        this.authService.login(this.loginForm.value)
            .subscribe(result => result ? this.router.navigate([
                'dashboard',
                'lessons-schedule',
                'groupSlug',
                'groupId',
            ]) : this.loginForm.reset(), () => this.loginForm.reset());
    }
}

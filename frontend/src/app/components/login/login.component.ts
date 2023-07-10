import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import { SwalError, SwalSuccess } from 'src/app/models/popups';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.login(
      {
        name: this.loginForm.value.name,
        password: this.loginForm.value.password,
      }
    ).subscribe((bool) => {
      if (bool) {
        SwalSuccess('Login successfully!');
        this.router.navigate(['store/store']);
      } else {
        SwalError('Username or password are incorrect');
      }
    });
  }

}

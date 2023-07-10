import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { CustomValidators } from './custom-validators'

import { AuthService } from 'src/app/services/auth.service';

import { SwalError, SwalSuccess } from 'src/app/models/popups';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('formDirective') formDirective!: NgForm;
  signupForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9\_\- ]*$/)]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        
        // check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true
        }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        // check whether the entered password has a lower case letter
        CustomValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true
        })
      ])
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  signup() {
    this.auth.signup(
      {
        name: this.signupForm.value.name,
        password: this.signupForm.value.password,
      }
    ).subscribe((bool) => {
      if (bool) {
        SwalSuccess('User created successfully');
        this.router.navigate(['/login']);
      } else {
        SwalError();
      }
    });
  }
}
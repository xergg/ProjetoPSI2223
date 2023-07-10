import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalSuccess, SwalError } from 'src/app/models/popups';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent {
  submitForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.submitForm = this.createFormGroup();
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      nif: new FormControl("", [Validators.required, Validators.pattern(/^\d{9}$/)]),
      residence: new FormControl(""),
      payOption: new FormControl("", [Validators.required])
    });
  }

  finish() {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      this.userService.finish(
        {
          id: userId,
          nif: this.submitForm.value.nif,
          residence: this.submitForm.value.residence,
          payOption: this.submitForm.value.payOption
        }
      ).subscribe((bool) => {
        if (bool) {
          SwalSuccess('Success');
          this.router.navigate(['/store/cart']);
        } else {
          SwalError();
        }
      });
    }
  }
}

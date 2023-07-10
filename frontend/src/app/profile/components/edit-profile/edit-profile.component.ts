import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { Pfp } from 'src/app/models/pfp';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  submitForm!: FormGroup;
  user!: User;
  selectedImage: string | undefined;
  images: Pfp[] = [
    {name: 'nierbrother', path: 'assets/images/profile_pictures/nierbrother.jpg'},
    {name: 'nierfather', path: 'assets/images/profile_pictures/nierfather.jpg'},
    {name: 'patches', path: 'assets/images/profile_pictures/patches.jpg'},
    {name: 'shulk', path: 'assets/images/profile_pictures/shulk.jpg'},
    {name: 'zackcloudsephiroth', path: 'assets/images/profile_pictures/zackcloudsephiroth.jpg'}
  ];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
    this.submitForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]*$')],
        asyncValidators: [this.checkUsername.bind(this)],
        updateOn: 'blur'
      })
    });
  }

  getUser() {
    this.userService.getUser(sessionStorage.getItem("userId")!).subscribe((user: User) => {
      this.user = user;
      this.selectedImage = user.profile_image;
    });
  }

  onSubmit() {
    this.userService.saveProfile({
      id: sessionStorage.getItem("userId")!,
      name: this.submitForm.value.name,
      profile_image: this.selectedImage
    }).subscribe((bool) => {
      if (bool) this.router.navigate([`user/${sessionStorage.getItem("userId")!}/profile`]);
    });
  }

  checkUsername(control: AbstractControl) {
    const username = control.value.toLowerCase();
    if (username === this.user.name.toLowerCase()) {
       
        return of(null);
    } else {
       
        return this.userService.getUsers().pipe(
            map((users: { name: string }[]) => {
                const usernameExists = users.some(user => user.name.toLowerCase() === username);
                return usernameExists ? { usernameExists: true } : null;
            })
        );
    }
}

  selectImageHandler(event: any, image: Pfp) {
    event.preventDefault();
    this.selectedImage = image.path;
  }
}

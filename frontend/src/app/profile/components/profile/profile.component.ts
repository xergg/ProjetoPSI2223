import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user!: User;

  constructor (
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = sessionStorage.getItem("userId")!;
    this.userService.getUser(id).subscribe((user: User) => this.user = user);
  }

  getProfileFollowingLink() {
    const userId = sessionStorage.getItem("userId")!;
    return `/user/${userId}/profile/following`
  }
}

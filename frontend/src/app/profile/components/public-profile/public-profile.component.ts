import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent {
  user!: User;
  user2!: User;
  isFollowing = false;
  idList: String[] = [];
  constructor (
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
    this.checkFollow();
  }

  getUser() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUser(id).subscribe((user: User) => {
       this.user = user
       
      });
      
  }

  checkFollow() {
    const id = sessionStorage.getItem("userId")!;
    const followId = this.route.snapshot.paramMap.get('id')!;
    
    

    this.userService.getUser(id).subscribe((user: User) => {
      this.user2 = user;
      
      if (this.user2.following.findIndex((user) => user._id.toString() === followId) !== -1) {
        this.isFollowing = true;
      } else {
        this.isFollowing = false;
      }
      
    });

    
  }

  followUser() {

    const id = sessionStorage.getItem("userId")!;
    const followId = this.route.snapshot.paramMap.get('id')!;
    
    console.log(this.isFollowing);

    if(!this.isFollowing){

      this.userService.addFollowing(id, followId).subscribe(() => {
        
      
      });

    } else {
      this.userService.removeFollowing(id, followId).subscribe(() => {
        
      });
    }
    this.isFollowing = !this.isFollowing;
    console.log(this.isFollowing);
  }

}
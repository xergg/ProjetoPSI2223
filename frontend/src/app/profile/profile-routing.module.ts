import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FollowingComponent } from './components/following/following.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: ':id/profile', component: ProfileComponent},
      { path: ':id/profile/edit', component: EditProfileComponent},
      { path: ':id/profile/following', component: FollowingComponent },
      { path: ':id/public-profile', component: PublicProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

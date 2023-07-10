import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { LoginGuardService } from './services/login-guard.service';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/store/store' },
  { path: 'library', loadChildren: () => import('./library/library.module').then(x => x.LibraryModule), canActivate: [AuthGuardService] },
  { path: 'store', loadChildren: () => import('./store/store.module').then(x => x.StoreModule), canActivate: [AuthGuardService] },
  { path: 'user', loadChildren: () => import('./profile/profile.module').then(x => x.ProfileModule), canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate:[LoginGuardService]},
  { path: 'signup', component: SignupComponent, canActivate:[LoginGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

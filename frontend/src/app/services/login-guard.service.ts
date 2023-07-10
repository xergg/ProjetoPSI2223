import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  private isLoggedIn!: Observable<boolean>;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isLoggedIn.subscribe((res) => {
      if (!res) this.router.navigate(["store/store"]);
    })
    return this.authService.isLoggedIn();
  }
}
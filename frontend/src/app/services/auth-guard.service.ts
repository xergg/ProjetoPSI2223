import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isAuthenticated!: Observable<boolean>;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAuthenticated.subscribe((res) => {
      if (!res) this.router.navigate(["login"]);
    })
    return this.authService.isAuthenticated();
  }

}
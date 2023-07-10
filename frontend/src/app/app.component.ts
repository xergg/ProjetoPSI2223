import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ResolveEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated!: boolean;
  isLogin!: boolean;
  isSignup!: boolean;

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof ResolveEnd) {
        this.isLogin = val.url === '/login';
        this.isSignup = val.url === '/signup';
        if (val.url !== '/login' && val.url !== '/signup') {
          this.authService.isAuthenticated().subscribe((isLoggedIn) => {
            this.isAuthenticated = isLoggedIn;
          })
        }
      }
    });
  }

  ngOnInit() {

  }
}

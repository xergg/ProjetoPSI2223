import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { delay, filter } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SwalSuccess, SwalError } from 'src/app/models/popups';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  user!: User;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width:800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close()
        }
      });
  }

  logout(): void {
    this.authService.logout().subscribe((res) => {
      if (res) {
        window.location.reload(); 
      } else {
        SwalError();
      }
    });
  }

  getProfileLink() {
    const userId = sessionStorage.getItem("userId")!;
    return `/user/${userId}/profile`
  }

  getProfileFollowingLink() {
    const userId = sessionStorage.getItem("userId")!;
    return `/user/${userId}/profile/following`
  }
}


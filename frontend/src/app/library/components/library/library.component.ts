import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';
import { delay } from 'rxjs';

import { Library_Item } from 'src/app/models/library_item';
import { UserService } from 'src/app/services/user.service';

@UntilDestroy()
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  items: Library_Item[] = [];
  nameSort = true;
  dateSort = true;

  ratio: string = "6:4";
  cols: string = "4";

  constructor(
    private userService: UserService,
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    const userId = sessionStorage.getItem('userId')!;
    this.userService.getLibrary(userId).subscribe(items => {
      
      this.items = items});
    this.items.sort((a: any, b: any) => {
      const dateA: string = a.date;
      const dateB: string = b.date;
      if (this.dateSort) {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      } else {
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }
    });

    console.log(this.items);
  }

  sortItemsByName(){
    this.items.sort((a: any, b: any) => {
      const nameA: string = a.item.name.toUpperCase(); 
      const nameB: string = b.item.name.toUpperCase();
      if (nameA < nameB) {
        return this.nameSort ? 1 : -1;
      }
      if (nameA > nameB) {
        return  this.nameSort ? -1 : 1;
      }
      return 0;
    });

    this.nameSort = !this.nameSort;
  }

  sortItemsByDate(){
    this.items.sort((a: any, b: any) => {
      const dateA: string = a.date;
      const dateB: string = b.date;
      if (this.dateSort) {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      } else {
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }
    });

    this.dateSort = !this.dateSort;
  }



  ngAfterViewInit() {
    this.observer
      .observe([Breakpoints.XSmall])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.ratio = "5:3";
          this.cols = "1";
        }
      });

    this.observer
      .observe([Breakpoints.Small])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.ratio = "6:4";
          this.cols = "2";
        }
      });

    this.observer
      .observe([Breakpoints.Medium])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.ratio = "6:4";
          this.cols = "3";
        }
      });

    this.observer
      .observe([Breakpoints.Large])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.ratio = "6:4";
          this.cols = "4";
        }
      });

    this.observer
      .observe([Breakpoints.XLarge])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.ratio = "6:4";
          this.cols = "5";
        }
      });
  }
}
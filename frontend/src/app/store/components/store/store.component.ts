import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay } from 'rxjs';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service'

@UntilDestroy()
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  items: Item[] = [];
  search: string = "";
  filteredItems: Item[] = [];

  searching = true;

  ratio: string = "6:4";
  cols: string = "4";

  constructor(
    private itemService: ItemService,
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemService.getItems().subscribe(items => this.items = items);
  }

  searchItems() {
    this.searching = true;
    if (this.search.trim() === '') {
      this.filteredItems = [];
    } else {
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase()));
    }
    setTimeout(() => {
      this.searching = false;
    }, 300);
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
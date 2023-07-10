import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { SwalSuccess, SwalError } from 'src/app/models/popups';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  item!: Item;

  constructor (
    private route: ActivatedRoute,
    private itemService: ItemService,
  ) { }

  ngOnInit() {
    this.getItem();
  }

  getItem() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.itemService.getItem(id).subscribe((item: Item) => this.item = item);
  }

  calculateAVGRate() {
    let count_rates = 0;
    for (let rate of this.item.rates) {
      count_rates += rate.rate
    }

    return this.item.rates.length ? (count_rates / this.item.rates.length).toFixed(1) : 0;
  }

}

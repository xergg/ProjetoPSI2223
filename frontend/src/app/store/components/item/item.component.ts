import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Item } from 'src/app/models/item';
import { Rate } from 'src/app/models/rate';
import { SwalError, SwalSuccess } from 'src/app/models/popups';

import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  item!: Item;
  submitForm!: FormGroup;
  commentForm!: FormGroup;
  value = 0;
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getItem();
    this.submitForm = this.createFormGroup();
    this.commentForm = this.createCommentForm();
    this.userId = sessionStorage.getItem("userId")!;
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      rate: new FormControl(0, [Validators.required]),
      opinion: new FormControl("")
    });
  }

  createCommentForm(): FormGroup {
    return new FormGroup({
      comment: new FormControl("", [Validators.required])
    });
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

  add() {
    const itemId = this.route.snapshot.paramMap.get('id')!;

    this.userService.addItemToCart(this.userId, itemId).subscribe((bool) => {
      if (bool) {
        SwalSuccess('Item added with success');
      } else {
        SwalError('Error adding item');
      }
    })
  }

  addToWishList() {
    const userId = sessionStorage.getItem("userId")!;
    const itemId = this.route.snapshot.paramMap.get('id')!;

    this.userService.addItemToWishList(userId, itemId).subscribe((bool) => {
      if (bool) {
        SwalSuccess('Item added with success');
      } else {
        SwalError('Error adding item');
      }
    })
  }

  publish() {
    const itemId = this.route.snapshot.paramMap.get('id')!;

    this.itemService.addRate(
      itemId,
      {
        user: this.userId,
        rate: this.submitForm.value.rate,
        opinion: this.submitForm.value.opinion,
      }
    ).subscribe((item) => {
      this.item = item;
      this.submitForm.reset();
      SwalSuccess('Your opinion was added successfully');
    });
  }

  getLikes(rate: Rate) {
    if (rate.opinions.length == 0) return 0;

    let count = 0;
    for (let opinion of rate.opinions) {
      if (opinion.flag) count++;
    }

    return count;
  }

  getDislikes(rate: Rate) {
    if (rate.opinions.length == 0) return 0;

    let count = 0;
    for (let opinion of rate.opinions) {
      if (!opinion.flag) count++;
    }

    return count;
  }

  addLike(rate: Rate) {
    const itemId = this.route.snapshot.paramMap.get('id')!;
    const userId = sessionStorage.getItem("userId")!;
    const opinion = {
      itemId,
      rateId: rate._id,
      user: userId,
      flag: true
    };

    this.itemService.addOpinion(opinion).subscribe((res) => {
      if (res.bool) {
        this.item = res.item;
        this.getLikes(rate);
      } else {
        SwalError('You already had liked');
      }
    });
  }

  addDislike(rate: Rate) {
    const itemId = this.route.snapshot.paramMap.get('id')!;
    const userId = sessionStorage.getItem("userId")!;
    const opinion = {
      itemId,
      rateId: rate._id,
      user: userId,
      flag: false
    };

    this.itemService.addOpinion(opinion).subscribe((res) => {
      if (res.bool) {
        this.item = res.item;
        this.getLikes(rate);
      } else {
        SwalError('Server error');
      }
    });
  }

  addComment(itemId: string, rate: Rate) {
    const userId = sessionStorage.getItem("userId")!;
    this.itemService.addComment(
      {
        itemId,
        rateId: rate._id,
        user: userId,
        comment: this.commentForm.value.comment
      }
    ).subscribe((res) => {
      if (res.bool) {
        this.item = res.item;
        this.commentForm.reset();
      } else {
        SwalError('Server error');
      }
    });
  }
}
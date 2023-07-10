import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { UserService } from 'src/app/services/user.service';
import { Cart_Item } from 'src/app/models/cart_item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Cart_Item[] = [];
  displayedColumns: string[] = ['Name', 'Type', 'Quantity', 'Price', 'Add', 'Remove'];
  dataSource!: MatTableDataSource<Cart_Item>;
  selection = new SelectionModel<Cart_Item>(true, []);

  @ViewChild(MatTable) table!: MatTable<Cart_Item>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getCart();
  }

  private getCart() {
    const id = sessionStorage.getItem("userId");
    if (id)
      this.userService.getCart(id).subscribe((items) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Cart_Item>(items);
        this.dataSource.paginator = this.paginator;
      })
  }
  add(element: Cart_Item) {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      element.quantity++;
      const item = {
        id: element.item._id,
        quantity: element.quantity
      }

      this.userService.updateCart({ id: userId, item: item }).subscribe()
    }
  }

  remove(element: Cart_Item) {
    
    if(element.quantity > 0)
      element.quantity--;

    const userId = sessionStorage.getItem("userId");
    if (userId) {
      const item = {
        id: element.item._id,
        quantity: element.quantity
      }

      this.userService.updateCart({ id: userId, item: item }).subscribe(() => {
        if (element.quantity == 0) {
          window.location.reload()
        }
      })      
    }
  }

  total() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.quantity * item.item.price;
    }
    return Math.round(totalPrice * 100) / 100
    ;
  }
}
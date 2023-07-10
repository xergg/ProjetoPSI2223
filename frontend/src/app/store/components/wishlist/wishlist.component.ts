import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Item } from 'src/app/models/item';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  items: Item[] = [];
  displayedColumns: string[] = ['Name', 'Type', 'Price', 'Remove'];
  dataSource!: MatTableDataSource<Item>;
  selection = new SelectionModel<Item>(true, []);

  @ViewChild(MatTable) table!: MatTable<Item>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getWishList();
  }

  private getWishList() {
    const id = sessionStorage.getItem("userId");
    if (id)
      this.userService.getWishlist(id).subscribe((items) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Item>(items);
        this.dataSource.paginator = this.paginator;
      })
  }

  remove(element: Item) {

    const userId = sessionStorage.getItem("userId")!;
      this.userService.updateWishList( userId, element._id).subscribe(() => {
          window.location.reload()
      })      
    }
  }

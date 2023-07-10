import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Cart_Item } from 'src/app/models/cart_item';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent {
  user!: User;
  users: User[] = [];
  search : string = "";
  filteredUsers : User[] = [];
  searching = true;

  displayedColumns: string[] = ['Name'];
  dataSource!: MatTableDataSource<string>;
  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatTable) table!: MatTable<Cart_Item>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getFollowingList();
    this.getUsers();
  }

  private getUsers() {
    const userId = sessionStorage.getItem("userId")!;
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      const index = this.users.findIndex(user => user._id == userId);
      if (index != -1)
        this.users.splice(index, 1)
    });
  }

  private getFollowingList() {
    const id = sessionStorage.getItem("userId")!;
    this.userService.getUser(id).subscribe((user) => {
      console.log(user)
      this.user = user;
      this.dataSource = new MatTableDataSource<string>(user.following);
      this.dataSource.paginator = this.paginator;
    });
  }

  searchUser() {
    this.searching = true;
    if (this.search.trim() === '') {
      this.filteredUsers = [];
    } else {
      this.filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(this.search.toLowerCase()));
    }
    setTimeout(() => {
      this.searching = false;
    }, 300);
  }
}

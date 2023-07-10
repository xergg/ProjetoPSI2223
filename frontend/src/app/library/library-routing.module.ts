import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './components/library/library.component';
import { ItemComponent } from './components/item/item.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'library', component: LibraryComponent },
      { path: 'item/:id', component:  ItemComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }

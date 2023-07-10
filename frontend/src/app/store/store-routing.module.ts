import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreComponent } from './components/store/store.component';
import { CartComponent } from './components/cart/cart.component';
import { FinishComponent } from './components/finish/finish.component';
import { ItemComponent } from './components/item/item.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'store', component: StoreComponent },
      { path: 'cart', component: CartComponent },
      { path: 'cart/finish', component: FinishComponent },
      { path: 'wishlist', component : WishlistComponent},
      { path: 'item/:id', component: ItemComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }

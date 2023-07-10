import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FinishComponent } from './components/finish/finish.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreComponent } from './components/store/store.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemComponent } from './components/item/item.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    StoreComponent,
    FinishComponent,
    ItemComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatGridListModule,
    TextFieldModule,
    MatSliderModule,
    MatExpansionModule
  ]
})
export class StoreModule { }

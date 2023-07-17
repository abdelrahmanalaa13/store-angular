import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [ProductsComponent, ProductCardComponent],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}

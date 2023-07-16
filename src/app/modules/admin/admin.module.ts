import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    AdminComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    SharedModule,
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './componants/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './componants/header/header.component';
import {BidiModule} from '@angular/cdk/bidi';



@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BidiModule
  ],
  exports: [
    LoginComponent,
    HeaderComponent
  ]
})
export class CoreModule { }

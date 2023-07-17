import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoadingResults = true;
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.productsService.getLoading().subscribe(loading => this.isLoadingResults = loading);
  }
  
}

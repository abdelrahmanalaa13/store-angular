import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [FilterPipe],
})
export class ProductsComponent implements OnInit {
  catagories: string[] = [];
  allProducts: Product[] = [];
  currentCategory: string = '';
  filteredProducts: Product[] = [];
  selectedCategoryIndex = 0;
  isLoading = true;
  isAnimating = false;
  animationDuration = 1000;
  constructor(
    private productsService: ProductsService,
    private filterPipe: FilterPipe
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.productsService
      .getLoading()
      .subscribe((isLoading) => (this.isLoading = isLoading));
  }

  getCategories() {
    this.productsService.setLoading(true);
    this.productsService.getCatagories().subscribe((catagories) => {
      if (!catagories) {
        this.productsService.getCatagoriesFromBE();
      } else {
        this.catagories = catagories;
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      if (!products) {
        this.productsService.getAllProductsFromBE();
      } else {
        this.allProducts = products;
        this.filterProducts(this.selectedCategoryIndex);
      }
    });
  }

  filterProducts(categoryIndex: number) {
    this.isAnimating = true;
    this.selectedCategoryIndex = categoryIndex;
    setTimeout(() => {
      this.filteredProducts =
        this.catagories[categoryIndex] === 'all'
          ? [...this.allProducts]
          : this.filterPipe.transform(
              this.allProducts,
              this.catagories[categoryIndex],
              'category'
            );
      this.isAnimating = false;
    }, this.animationDuration * 0.7);
  }
}

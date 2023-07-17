import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { StorageService } from 'src/app/shared/services/storage.service';

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
    private storageService: StorageService,
    private filterPipe: FilterPipe
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.storageService
      .getLoading()
      .subscribe((isLoading) => (this.isLoading = isLoading));
  }

  getCategories() {
    this.storageService.setLoading(true);
    this.storageService.getCatagories().subscribe((catagories) => {
      if (!catagories) {
        this.storageService.getCatagoriesFromBE();
      } else {
        this.catagories = catagories;
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.storageService.getAllProducts().subscribe((products) => {
      if (!products) {
        this.storageService.getAllProductsFromBE();
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

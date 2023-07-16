import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsBackendService } from './products-backend.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private productsBackendService: ProductsBackendService) {}
  loadingSubject = new BehaviorSubject<boolean>(false);
  productsSubject = new BehaviorSubject<Product[] | null>(null);

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  getLoading() {
    return this.loadingSubject.asObservable();
  }

  setAllProducts(products: Product[]): void {
    this.productsSubject.next(products);
    this.setLoading(false);
  }

  getAllProducts() {
    return this.productsSubject.asObservable();
  }

  getAllProductsFromBE() {
    this.productsBackendService.getProducts().subscribe((products) => {
      if (products) {
        this.setAllProducts(products);
      }
    });
  }

  editProduct(editedProduct: Product) {
    const currentProducts = this.productsSubject.value;
    if (!currentProducts) {
      return;
    }
    this.setLoading(true);
    this.productsBackendService
      .updateProduct(editedProduct.id, editedProduct)
      .subscribe((product: Product) => {
        let productIndexToEdit = currentProducts.findIndex(
          (element) => element.id === product.id
        );
        if (currentProducts[productIndexToEdit]) {
          currentProducts[productIndexToEdit] = Object.assign(
            currentProducts[productIndexToEdit],
            product
          );
          this.setAllProducts(currentProducts);
        }
      });
  }

  addProduct(newProduct: Product) {
    const currentProducts = this.productsSubject.value;
    if (!currentProducts) {
      return;
    }
    this.setLoading(true);
    this.productsBackendService
      .addProduct(newProduct)
      .subscribe((product: Product) => {
        if (product) {
          currentProducts.push(product);
          this.setAllProducts(currentProducts);
        }
      });
  }
  deleteProduct(id: number) {
    const currentProducts = this.productsSubject.value;
    if (!currentProducts) {
      return;
    }
    this.setLoading(true);
    this.productsBackendService
      .deleteProduct(id)
      .subscribe((product: Product) => {
        if (product) {
          const indexToRemove = currentProducts.findIndex(
            (product) => product.id === id
          );
          currentProducts.splice(indexToRemove, 1);
          this.setAllProducts(currentProducts);
        }
      });
  }
}
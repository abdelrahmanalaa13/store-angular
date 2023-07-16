import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsBackendService } from 'src/app/shared/services/products-backend.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() productData: Product = <Product>{};

  @Output() onEdit: EventEmitter<any> = new EventEmitter<Product>();
  @Output() onAdd: EventEmitter<any> = new EventEmitter<Product>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsBackendService: ProductsBackendService
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.isEdit) {
      this.productForm.setValue({
        title: this.productData.title,
        description: this.productData.description,
        price: this.productData.price,
        category: this.productData.category,
        image: this.productData.image,
      });
    }
  }

  submit() {
    if (this.productForm.valid) {
      const data = this.productForm.getRawValue() as Product;
      data.id = this.productData.id;
      this.isEdit ? this.onEdit.emit(data) : this.onAdd.emit(data);
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}

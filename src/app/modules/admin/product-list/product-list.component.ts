import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsBackendService } from 'src/app/shared/services/products-backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'category', 'price'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource: MatTableDataSource<Product>;
  products: any;
  expandedElement = null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: any;
  constructor(
    private productsBackendService: ProductsBackendService,
    public dialog: MatDialog,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.storageService.getAllProducts().subscribe((products) => {
      if (!products) {
        this.storageService.getAllProductsFromBE();
      } else {
        this.dataSource = new MatTableDataSource(products);
        setTimeout(() => this.applyTableData(products));
        console.log(products);
      }
    })
  }

  applyTableData(products: Product[]) {
    this.products = products;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(isEdit: boolean, el: any, productDate?: Product): void {
    this.dialogRef = this.dialog.open(el, {
      data: { isEdit, productDate: { ...productDate } },
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteProduct(id: number) {
    this.storageService.deleteProduct(id);
  }

  editProduct(data: Product) {
    this.storageService.editProduct(data);
    this.dialogRef.close();
  }
  addProduct(productData: Product) {
    this.storageService.addProduct(productData);
    this.dialogRef.close();
  }
}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/shared/services/products.service';

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
export class ProductListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'category', 'price'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource: MatTableDataSource<Product>;
  products: any;
  expandedElement = null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: any;
  constructor(
    public dialog: MatDialog,
    private productsService: ProductsService
  ) {}

  ngAfterViewInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts()?.subscribe((products) => {
      if (!products) {
        this.productsService.getAllProductsFromBE();
      } else {
        this.dataSource = new MatTableDataSource(products);
        setTimeout(() => this.applyTableData(products));
      }
    });
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
    this.productsService.deleteProduct(id);
  }

  editProduct(data: Product) {
    this.productsService.editProduct(data);
    this.dialogRef?.close();
  }
  addProduct(productData: Product) {
    this.productsService.addProduct(productData);
    this.dialogRef?.close();
  }
}

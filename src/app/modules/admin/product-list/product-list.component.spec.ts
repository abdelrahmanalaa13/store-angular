import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

import { ProductListComponent } from './product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsServiceMock: any;
  let matDialogMock: any;
  let mockProductData: Product[];
  let matDialogRefMock: MatDialogRef<any>; 

  beforeEach(async () => {
    productsServiceMock = jasmine.createSpyObj('ProductsService', [
      'getAllProducts',
      'editProduct',
      'deleteProduct',
      'addProduct',
      'getAllProductsFromBE',
    ]);

    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogMock.open.and.returnValue(matDialogRefMock);

    const mockPaginator = jasmine.createSpyObj('MatPaginatorIntl', [
      'getRangeLabel',
    ]);
    mockPaginator.getRangeLabel.and.returnValue('1 - 10 of 100');

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [
        TranslateModule.forRoot(), // add TranslateModule to imports
        MatIconModule, // Add MatIconModule here
        MatPaginatorModule,
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: MatPaginator, useValue: mockPaginator }, // provide mock paginator intl
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    mockProductData = [
      {
        id: 1,
        title: 'Product 1',
        category: 'Category A',
        price: 10,
        description: 'Description 1',
        image: 'image-1.jpg',
      },
      {
        id: 2,
        title: 'Product 2',
        category: 'Category B',
        price: 20,
        description: 'Description 2',
        image: 'image-2.jpg',
      },
      {
        id: 3,
        title: 'Product 3',
        category: 'Category C',
        price: 30,
        description: 'Description 3',
        image: 'image-3.jpg',
      },
    ];
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on ngAfterViewInit', () => {
    const getAllProductsSpy =
      productsServiceMock.getAllProducts.and.returnValue(of(mockProductData));
    spyOn(component, 'applyTableData');
    component.ngAfterViewInit();
    expect(getAllProductsSpy).toHaveBeenCalled();
  });

  it('should open the dialog', () => {
    component.openDialog(true, {}, mockProductData[0]);
    expect(matDialogMock.open).toHaveBeenCalled();
  });

  it('should delete a product', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteProductSpy = productsServiceMock.deleteProduct.and.returnValue(
      of({})
    );
    spyOn(component, 'applyTableData');
    component.deleteProduct(mockProductData[0].id);
    expect(deleteProductSpy).toHaveBeenCalledWith(mockProductData[0].id);
  });

  it('should edit a product', () => {
    const editProductSpy = productsServiceMock.editProduct.and.returnValue(
      of({})
    );
    spyOn(component, 'applyTableData');
    component.editProduct(mockProductData[0]);
    expect(editProductSpy).toHaveBeenCalledWith(mockProductData[0]);
  });

  it('should add a product', () => {
    const addProductSpy = productsServiceMock.addProduct.and.returnValue(
      of({})
    );
    spyOn(component, 'applyTableData');
    component.addProduct({
      id: 5,
      title: 'Product 9',
      category: 'Category A',
      price: 110,
      description: 'Description 1',
      image: 'image-12.jpg',
    });
    expect(addProductSpy).toHaveBeenCalled();
  });

  it('should handle empty product data', () => {
    const getAllProductsSpy =
      productsServiceMock.getAllProducts.and.returnValue(of([]));
    spyOn(component, 'applyTableData');
    component.ngAfterViewInit();
    expect(getAllProductsSpy).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(0);
  });

  it('should apply table data', () => {
    const mockDataSource = new MatTableDataSource(mockProductData);

    component.dataSource = mockDataSource;

    component.applyTableData(mockProductData);

    expect(component.dataSource.data).toEqual(mockProductData);
  });
});

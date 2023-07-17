import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() productData: Product = <Product>{};
  maxChars = 50; 
  showMore: boolean = true;
  toggleShowMoreText = () => (this.showMore = !this.showMore);
}

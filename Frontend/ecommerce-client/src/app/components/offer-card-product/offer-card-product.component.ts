import { Component, Input } from '@angular/core';
import { InfoProductComponent } from "../info-product/info-product.component";
import { AddCartComponent } from "../add-cart/add-cart.component";
import { AddWhislistComponent } from "../add-whislist/add-whislist.component";
import { StockStatusComponent } from "../stock-status/stock-status.component";
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-offer-card-product',
  standalone: true,
  imports: [InfoProductComponent, AddCartComponent, AddWhislistComponent, StockStatusComponent],
  templateUrl: './offer-card-product.component.html',
  styleUrl: './offer-card-product.component.scss'
})
export class OfferCardProductComponent {
  @Input()
  product!: Product;

  
  stockStatus!: boolean;


  ngOnInit() {
    this.getStock();
  }

  getStock() {
    if (this.product.stock > 0) {
      return this.stockStatus = true;
    } else {
      return this.stockStatus = false;
    }
  }


}

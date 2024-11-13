import { Component, Input } from '@angular/core';
import { InfoProductComponent } from "../info-product/info-product.component";
import { AddCartComponent } from "../add-cart/add-cart.component";
import { PriceViewComponent } from "../price-view/price-view.component";
import { CommonModule } from '@angular/common';
import { AddWhislistComponent } from "../add-whislist/add-whislist.component";
import { StockStatusComponent } from "../stock-status/stock-status.component";
import { Product } from '../../models/product.model';
import { OffersService } from '../../services/Offers.service';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [InfoProductComponent, AddCartComponent, CommonModule, AddWhislistComponent, StockStatusComponent],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {

  @Input()
  product!: Product;
  offer: Offer | undefined;

  stockStatus!: boolean;

  constructor(private offersService: OffersService) { }

  ngOnInit() {

    if (this.product.id_offer !== null) {
      this.offersService.getOffer(this.product.id_offer.toString()).subscribe(offer => {
        this.offer = offer;
      });
    }
    

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

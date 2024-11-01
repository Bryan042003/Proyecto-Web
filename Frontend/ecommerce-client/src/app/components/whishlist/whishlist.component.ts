import { Component } from '@angular/core';
import { PriceViewComponent } from "../price-view/price-view.component";
import { StockStatusComponent } from "../stock-status/stock-status.component";
import { AddCartComponent } from "../add-cart/add-cart.component";
import { InfoProductComponent } from "../info-product/info-product.component";

@Component({
  selector: 'app-whishlist',
  standalone: true,
  imports: [PriceViewComponent, StockStatusComponent, AddCartComponent, InfoProductComponent],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.scss'
})
export class WhishlistComponent {

}

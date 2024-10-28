import { Component } from '@angular/core';
import { InfoProductComponent } from "../info-product/info-product.component";
import { AddCartComponent } from "../add-cart/add-cart.component";
import { PriceViewComponent } from "../price-view/price-view.component";
import { CommonModule } from '@angular/common';
import { AddWhislistComponent } from "../add-whislist/add-whislist.component";
import { StockStatusComponent } from "../stock-status/stock-status.component";

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [InfoProductComponent, AddCartComponent, PriceViewComponent, CommonModule, AddWhislistComponent, StockStatusComponent],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {

}

import { Component } from '@angular/core';
import { AddCartComponent } from "../add-cart/add-cart.component";
import { AddWhislistComponent } from "../add-whislist/add-whislist.component";
import { StockStatusComponent } from "../stock-status/stock-status.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [AddCartComponent, AddWhislistComponent, StockStatusComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

}

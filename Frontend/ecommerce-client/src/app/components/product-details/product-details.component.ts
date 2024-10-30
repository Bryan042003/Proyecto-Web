import { Component } from '@angular/core';
import { AddCartComponent } from "../add-cart/add-cart.component";
import { AddWhislistComponent } from "../add-whislist/add-whislist.component";
import { StockStatusComponent } from "../stock-status/stock-status.component";
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from "../star-rating/star-rating.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [AddCartComponent, AddWhislistComponent, StockStatusComponent, CommonModule, StarRatingComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  rating = 5;
  stars = [1, 2, 3, 4, 5]; 

  rate(star: number): void {
    this.rating = this.rating; 
  }


}

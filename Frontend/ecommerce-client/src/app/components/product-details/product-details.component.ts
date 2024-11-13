import { Component } from '@angular/core';
import { AddCartComponent } from "../add-cart/add-cart.component";
import { AddWhislistComponent } from "../add-whislist/add-whislist.component";
import { StockStatusComponent } from "../stock-status/stock-status.component";
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/Product.service';
import { Product } from '../../models/product.model';
import { OffersService } from '../../services/Offers.service';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [AddCartComponent, AddWhislistComponent, StockStatusComponent, CommonModule, StarRatingComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productId!: string ;
  product: Product | undefined;
  stockStatus!: boolean;
  offer: Offer | undefined;
  
  constructor(private route: ActivatedRoute, private productService:ProductService, private offersService: OffersService) {}


  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';

      this.productService.getProduct(this.productId).subscribe(product => {
        this.product = product;

        if (this.product.id_offer !== null) {
          this.offersService.getOffer(this.product.id_offer.toString()).subscribe(offer => {
            this.offer = offer;
          });
        }

        this.getStock();
      } );
      
    });

  }

  getStock() {
    if (this.product && this.product.stock > 0) {
      return this.stockStatus = true;
    } else {
      return this.stockStatus = false;
    }
  }

  rating = 5;
  stars = [1, 2, 3, 4, 5]; 

  rate(star: number): void {
    this.rating = this.rating; 
  }


}

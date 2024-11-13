import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/Product.service';
import { Product } from '../../models/product.model';
import { CardProductComponent } from "../card-product/card-product.component";


@Component({
  selector: 'app-slider-day-promotions',
  standalone: true,
  imports: [CommonModule, CardProductComponent],
  templateUrl: './slider-day-promotions.component.html',
  styleUrl: './slider-day-promotions.component.scss'
})
export class SliderDayPromotionsComponent implements OnInit {

  public products: Product[] = [];


  constructor(private productService: ProductService) { }

  displayedSlides = 4;
  currentIndex = 0;

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products.filter(product => product.id_offer !== null);
    });
  }


  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.products.length - this.displayedSlides;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.products.length - this.displayedSlides) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
  }

}

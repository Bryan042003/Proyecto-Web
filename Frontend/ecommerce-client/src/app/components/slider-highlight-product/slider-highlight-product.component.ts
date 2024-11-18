import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/Product.service';
import { Product } from '../../models/product.model';
import { CardProductComponent } from "../card-product/card-product.component";

@Component({
  selector: 'app-slider-highlight-product',
  standalone: true,
  imports: [CommonModule, CardProductComponent],
  templateUrl: './slider-highlight-product.component.html',
  styleUrl: './slider-highlight-product.component.scss'
})
export class SliderHighlightProductComponent implements OnInit {
  public highlihtProducts: Product[] = [];

  constructor(private productService: ProductService) { }
  displayedSlides = 4;
  currentIndex = 0;

  ngOnInit(): void {
    this.productService.getHighlightedProducts().subscribe((products: Product[]) => {
      this.highlihtProducts = products;
    });
  }
  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.highlihtProducts.length - this.displayedSlides;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.highlihtProducts.length - this.displayedSlides) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
  }

}

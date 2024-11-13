import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from "../card-product/card-product.component";


@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, CardProductComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent {


  displayedSlides = 4; 
  currentIndex = 0;

  slides = ["hola", "hola1", "hola2", "hola3", "hola4", "hola5", "hola6"];

  previousSlide1() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.slides.length - this.displayedSlides;
    }
  }

  nextSlide1() {
    if (this.currentIndex < this.slides.length - this.displayedSlides) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
  }
}

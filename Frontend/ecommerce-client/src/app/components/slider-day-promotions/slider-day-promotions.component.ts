import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from "../card-product/card-product.component";

@Component({
  selector: 'app-slider-day-promotions',
  standalone: true,
  imports: [CommonModule, CardProductComponent],
  templateUrl: './slider-day-promotions.component.html',
  styleUrl: './slider-day-promotions.component.scss'
})
export class SliderDayPromotionsComponent {
  displayedSlides = 4; 
  currentIndex = 0;

  slides = ["hola", "hola1", "hola2", "hola3", "hola4", "hola5", "hola6"];

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.slides.length - this.displayedSlides;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.slides.length - this.displayedSlides) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
  }

}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from "../card-product/card-product.component";

@Component({
  selector: 'app-products-per-category',
  standalone: true,
  imports: [CommonModule, CardProductComponent],
  templateUrl: './products-per-category.component.html',
  styleUrls: ['./products-per-category.component.scss']
})
export class ProductsPerCategoryComponent {
  displayedSlides = 10;
  currentIndex = 0;
  loading = false;

  slides = [
    "hola", "hola1", "hola2", "hola3", "hola4", "hola5", "hola6",
    "hola7", "hola8", "hola9", "hola10", "hola11", "hola12", "hola13",
    "hola14", "hola15", "hola16", "hola17", "hola18", "hola19", "hola20",
    "hola21", "hola22", "hola23", "hola24", "hola25", "hola26", "hola27",
    "hola28", "hola29", "hola30", "hola31", "hola32", "hola33", "hola34",
    "hola35", "hola36", "hola37", "hola38", "hola39", "hola40", "hola41",
    "hola42", "hola43", "hola44", "hola45", "hola46", "hola47", "hola48",
    "hola49", "hola50", "hola51", "hola52", "hola53", "hola54", "hola55",
    "hola56", "hola57", "hola58", "hola59", "hola60"
  ];

  displayedItems = this.slides.slice(0, this.displayedSlides);

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !this.loading) {
      this.loadMoreSlides();
    }
  }

  loadMoreSlides() {
    if (this.displayedSlides < this.slides.length) {
      this.loading = true;

      // Simulate loading time
      setTimeout(() => {
        this.displayedSlides += 10;
        this.displayedItems = this.slides.slice(0, this.displayedSlides);
        this.loading = false;
      }, 1000); // Tiempo de espera simulado
    }
  }
}

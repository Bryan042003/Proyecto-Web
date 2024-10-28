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
  displayedSlides = 4; // Número de componentes visibles
  currentIndex = 0; // Índice actual
  currentDirection = ''; // Para controlar la dirección del desplazamiento

  // Lista de ejemplos; reemplaza esto con tus propios datos
  slides = ["hola","hola1","hola2","hola3","hola4","hola5","hola6"];

  previousSlide() {
    this.currentDirection = 'translate-x-[100%]'; // Desplazamiento hacia la derecha
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    setTimeout(() => {
      this.currentDirection = ''; // Resetear la dirección
    }, 500); // Duración de la animación
  }

  nextSlide() {
    this.currentDirection = 'translate-x-[-100%]'; // Desplazamiento hacia la izquierda
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    setTimeout(() => {
      this.currentDirection = ''; // Resetear la dirección
    }, 500); // Duración de la animación
  }

  get visibleSlides() {
    const totalSlides = this.slides.length;
    const slidesToShow = [];
    for (let i = 0; i < this.displayedSlides; i++) {
      const index = (this.currentIndex + i) % totalSlides;
      slidesToShow.push(this.slides[index]);
    }
    return slidesToShow;
  }

}

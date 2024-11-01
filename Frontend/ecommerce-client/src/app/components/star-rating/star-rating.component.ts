import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  
  rating = 0; // Valor de la calificación
  stars = [1, 2, 3, 4, 5]; // Número de estrellas

  rate(star: number): void {
    this.rating = star; // Actualiza la calificación según la estrella seleccionada
  }

}

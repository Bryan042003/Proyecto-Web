import { Component, EventEmitter, Output, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent {
  @Input() rating: number = 0; // Calificación inicial
  @Output() ratingChange = new EventEmitter<number>(); // Emite la calificación al componente padre
  stars = [1, 2, 3, 4, 5]; // Número de estrellas

  // Función que maneja la actualización de la calificación y la emite al formulario
  private onChange: (rating: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(rating: number): void {
    if (rating !== undefined) {
      this.rating = rating;
    }
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Aquí puedes manejar la lógica para deshabilitar el componente si es necesario
  }


  // Llamado cuando se selecciona una estrella
  rate(star: number): void {
    this.rating = star; // Actualiza la calificación
    this.onChange(this.rating); // Notifica al formulario del cambio
    this.ratingChange.emit(this.rating); // Emite al componente padre
  }
}

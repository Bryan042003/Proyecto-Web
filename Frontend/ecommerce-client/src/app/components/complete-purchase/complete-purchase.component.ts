import { Component } from '@angular/core';

@Component({
  selector: 'app-complete-purchase',
  standalone: true,
  imports: [],
  templateUrl: './complete-purchase.component.html',
  styleUrl: './complete-purchase.component.scss'
})
export class CompletePurchaseComponent {
  // Inicializar el valor del contador
  counter: number = 1;

  // Función para incrementar el contador
  increment() {
    this.counter++;
  }

  // Función para decrementar el contador
  decrement() {
    if (this.counter > 1) { // Evitar que el contador sea menor a 1
      this.counter--;
    }
  }
}

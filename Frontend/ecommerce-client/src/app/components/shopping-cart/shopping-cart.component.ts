import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

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
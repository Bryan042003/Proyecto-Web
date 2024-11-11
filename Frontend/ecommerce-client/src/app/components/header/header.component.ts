import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  logueado: boolean = false;  
  cartProducts: Array<Product & { quantity: number }> = [];
  subtotal: number = 0; // Variable para almacenar el total
  total: number = 0; // Variable para almacenar el total
  IVA: number = 0.13; // Variable para almacenar el IVA

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {

    
    this.cartProducts = Object.values(this.localStorageService.getAllProducts());
    this.calculateSubtotal(); // Calcular el subtotal inicial
    this.calculateIVA(); // Calcular el IVA inicial
    this.calculateTotal(); // Calcular el total inicial
    
  }

  ShoppingCartDelete(productId: number): void {
    this.localStorageService.removeProduct(productId);
    this.cartProducts = Object.values(this.localStorageService.getAllProducts());
    this.calculateSubtotal(); // Calcular el subtotal inicial
    this.calculateIVA(); // Calcular el IVA inicial
    this.calculateTotal(); // Calcular el total inicial

  }

  getQuantity(productId: number): number {
    return this.localStorageService.getProductQuantity(productId);
  }

  // Método para calcular el total del carrito
  calculateTotal() {
    this.total = (this.subtotal + 2500) + this.IVA;
  }

  calculateSubtotal() {
    // Obtener todos los productos del LocalStorage
    const products = Object.values(this.localStorageService.getAllProducts());
  
    // Calcular el subtotal sumando el precio de cada producto multiplicado por su cantidad
    this.subtotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  }
  

  calculateIVA() {
    this.IVA = (this.subtotal + 2500) * 0.13;

  }


}

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

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

  // Incrementar la cantidad específica de un producto
  incrementQuantity(product: Product) {
    const newQuantity = this.localStorageService.getProductQuantity(product.id) + 1;

    // Actualizar la cantidad en el LocalStorage
    this.localStorageService.updateProductQuantity(product.id, newQuantity);

    this.calculateSubtotal(); // Calcular el subtotal
    this.calculateIVA(); // Calcular el IVA
    this.calculateTotal(); // Calcular el total
  }

  // Decrementar la cantidad específica de un producto
  decrementQuantity(product: Product) {
    const currentQuantity = this.localStorageService.getProductQuantity(product.id);

    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;

      // Actualizar la cantidad en el LocalStorage
      this.localStorageService.updateProductQuantity(product.id, newQuantity);

      this.calculateSubtotal(); // Calcular el subtotal
      this.calculateIVA(); // Calcular el IVA
      this.calculateTotal(); // Calcular el total
    }
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
    this.IVA = Math.round((this.subtotal + 2500) * 0.13);

  }
}

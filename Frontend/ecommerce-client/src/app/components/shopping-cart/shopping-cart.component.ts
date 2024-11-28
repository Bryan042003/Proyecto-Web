import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../authGuard/auth.guard';
import { AlertErrorComponent } from "../alert-error/alert-error.component";


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterModule, CommonModule, AlertErrorComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartProducts: Array<Product & { quantity: number }> = [];
  subtotal: number = 0; // Variable para almacenar el total
  total: number = 0; // Variable para almacenar el total
  IVA: number = 0.13; // Variable para almacenar el IVA
  logged: boolean = false;
  message = "No hay stock suficiente para agregar más unidades de este producto.";
  noStock: boolean = false;

  constructor(private localStorageService: LocalStorageService, public authGuard: AuthGuard, private router: Router,) { }

  ngOnInit() {
    this.logged = this.authGuard.logged();

    this.cartProducts = Object.values(this.localStorageService.getAllProducts());
    this.calculateSubtotal(); 
    this.calculateIVA(); 
    this.calculateTotal(); 

  }

  navigate() {
    if (this.logged) {
      const element = document.getElementById('main-content');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.router.navigate(['/store/complete-purchase']);
    } else {
      const element = document.getElementById('main-content');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.router.navigate(['/store/login']);

    }
  }

  ShoppingCartDelete(productId: number): void {
    this.localStorageService.removeProduct(productId);
    this.cartProducts = Object.values(this.localStorageService.getAllProducts());
    this.calculateSubtotal(); 
    this.calculateIVA(); 
    this.calculateTotal();
    window.location.reload(); 

  }

  incrementQuantity(product: Product) {
    if( product.stock > this.localStorageService.getProductQuantity(product.id) ) {
    const newQuantity = this.localStorageService.getProductQuantity(product.id) + 1;
  
    this.localStorageService.updateProductQuantity(product.id, newQuantity);
  
    this.cartProducts = [...Object.values(this.localStorageService.getAllProducts())];
  
    this.calculateSubtotal(); 
    this.calculateIVA(); 
    this.calculateTotal(); 

    window.location.reload();
    }else{
      this.noStock= true;
      setTimeout(() => {

        this.noStock = false;
      }, 3000);
      
    }
  }
  


  decrementQuantity(product: Product) {
    const currentQuantity = this.localStorageService.getProductQuantity(product.id);

    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;

      this.localStorageService.updateProductQuantity(product.id, newQuantity);

      this.calculateSubtotal(); 
      this.calculateIVA(); 
      this.calculateTotal(); 
    }
    window.location.reload();
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

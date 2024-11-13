import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { Product } from '../../models/product.model';
import { CategoryService } from '../../services/Category.service';
import { AuthGuard } from '../../authGuard/auth.guard';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  logged: boolean = false;

  cartProducts: Array<Product & { quantity: number }> = [];

  whishlistProducts: Array<Product> = [];


  subtotal: number = 0; // Variable para almacenar el total
  total: number = 0; // Variable para almacenar el total
  IVA: number = 0.13; // Variable para almacenar el IVA

  categories: any[] = [];


  constructor(private localStorageService: LocalStorageService, public categoryService: CategoryService, public authGuard: AuthGuard) { }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.logged = this.authGuard.logged();

    this.cartProducts = Object.values(this.localStorageService.getAllProducts());

    this.whishlistProducts = Object.values(this.localStorageService.getAllProductsWish());

    this.calculateSubtotal();
    this.calculateIVA(); 
    this.calculateTotal(); 

  }

  ShoppingCartDelete(productId: number): void {
    this.localStorageService.removeProduct(productId);
    this.cartProducts = Object.values(this.localStorageService.getAllProducts());
    this.calculateSubtotal(); 
    this.calculateIVA(); 
    this.calculateTotal(); 

  }

  WhishlistDelete(productId: number): void {
    this.localStorageService.removeProductWish(productId);
    this.whishlistProducts = Object.values(this.localStorageService.getAllProductsWish());
}


  getQuantity(productId: number): number {
    return this.localStorageService.getProductQuantity(productId);
  }

  calculateTotal() {
    this.total = (this.subtotal + 2500) + this.IVA;
  }

  calculateSubtotal() {
    const products = Object.values(this.localStorageService.getAllProducts());
    this.subtotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  }


  calculateIVA() {
    this.IVA = (this.subtotal + 2500) * 0.13;

  }


}

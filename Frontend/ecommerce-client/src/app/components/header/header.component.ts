import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { Product } from '../../models/product.model';
import { CategoryService } from '../../services/Category.service';
import { AuthGuard } from '../../authGuard/auth.guard';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  logged: boolean = false;

  cartProducts: Array<Product & { quantity: number }> = [];

  whishlistProducts: Array<Product> = [];


  subtotal: number = 0; // Variable para almacenar el total
  total: number = 0; // Variable para almacenar el total
  IVA: number = 0.13; // Variable para almacenar el IVA

  categories: any[] = [];


  constructor(private router: Router,private viewportScroller: ViewportScroller, private localStorageService: LocalStorageService, public categoryService: CategoryService, public authGuard: AuthGuard) { }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.logged = this.authGuard.logged();
    this.cartProducts = Object.values(this.localStorageService.getAllProducts());

    this.calculateSubtotal();
    this.calculateIVA();
    this.calculateTotal();

    this.whishlistProducts = Object.values(this.localStorageService.getAllProductsWish());

    

  }

  incrementQuantity(product: Product) {
    const newQuantity = this.localStorageService.getProductQuantity(product.id) + 1;
  
    this.localStorageService.updateProductQuantity(product.id, newQuantity);
  
    this.calculateSubtotal(); 
    this.calculateIVA(); 
    this.calculateTotal(); 

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
  }


  scrollToMainContent() {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  ShoppingCartDelete(productId: number): void {
    this.localStorageService.removeProduct(productId); 
    this.getProducts();
    this.calculateSubtotal(); 
    this.calculateIVA(); 
    this.calculateTotal(); 
  }

  getProducts(): void {
    this.cartProducts = Object.values(this.localStorageService.getAllProducts());
    
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
    this.IVA = Math.round((this.subtotal + 2500) * 0.13);

  }

  logout() {
    this.localStorageService.removeItem('token');
    this.logged = false;
    setTimeout(() => {
        this.router.navigate(['/store']);
    }, 100);
  
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { Product } from '../../models/product.model';
import { CategoryService } from '../../services/Category.service';
import { AuthGuard } from '../../authGuard/auth.guard';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { AlertErrorComponent } from "../alert-error/alert-error.component";
import { ProductService } from '../../services/Product.service';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, AlertErrorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  logged: boolean = false;

  products: Product[] = [];


  cartProducts: Array<Product & { quantity: number }> = [];

  whishlistProducts: Array<Product> = [];


  subtotal: number = 0; 
  total: number = 0; 
  IVA: number = 0.13; 

  categories: any[] = [];

  message = "No hay stock suficiente para agregar más unidades de este producto.";
  noStock: boolean = false;

  constructor(private productService: ProductService, private router: Router, private viewportScroller: ViewportScroller, private localStorageService: LocalStorageService, public categoryService: CategoryService, public authGuard: AuthGuard) { }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.logged = this.authGuard.logged();
    this.cartProducts = Object.values(this.localStorageService.getAllProducts());

    this.calculateSubtotal();
    this.calculateIVA();
    this.calculateTotal();

    this.whishlistProducts = Object.values(this.localStorageService.getAllProductsWish());

  }

  setDefaultImage(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'images/logo.png';
  }

  filteredProducts: Product[] = [];

  filterProducts(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    if (query) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredProducts = [];
    }
  }

  selectProduct(product: Product, input: HTMLInputElement): void {
    console.log('Producto seleccionado:', product);
    this.scrollToMainContent();
    this.router.navigate(['/store/product-details/', product.id]);
      input.value = '';
      this.filteredProducts = [];
  }

  incrementQuantity(product: Product) {
    if (product.stock > this.localStorageService.getProductQuantity(product.id)) {
      const newQuantity = this.localStorageService.getProductQuantity(product.id) + 1;

      this.localStorageService.updateProductQuantity(product.id, newQuantity);

      this.calculateSubtotal();
      this.calculateIVA();
      this.calculateTotal();
    } else {
      this.noStock = true;
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.router.navigate(['/store']);
    }, 100);

  }

  navigate() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/store']);
  }

}

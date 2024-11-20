import { Product } from './../../models/product.model';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/Product.service';
import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


@Component({
  selector: 'app-inventory-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './inventory-admin.component.html',
  styleUrl: './inventory-admin.component.scss'
})
export class InventoryAdminComponent {
  products: Product[] = [];

  constructor(private _productService: ProductService){}
  
  ngOnInit(): void {
    this.loadProducts();


  }
  

  loadProducts() {
    this._productService.getProducts()
      .subscribe({
        next: (result: Product[]) => {
          this.products = result;
          console.log(this.products);
        },
        error: (error: any) => {
          console.error('Error al obtener usuarios:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }

}

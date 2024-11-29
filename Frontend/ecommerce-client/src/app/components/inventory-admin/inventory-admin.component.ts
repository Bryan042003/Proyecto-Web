import { Category } from './../../models/cateory.model';
import { Product } from './../../models/product.model';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/Product.service';
import { AlertsComponent } from '../../components/alerts/alerts.component';
import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { OffertsModalComponent } from '../offerts-modal/offerts-modal.component';
import { CategoryService } from '../../services/Category.service';


@Component({
  selector: 'app-inventory-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, OffertsModalComponent, AlertsComponent],
  templateUrl: './inventory-admin.component.html',
  styleUrl: './inventory-admin.component.scss'
})
export class InventoryAdminComponent {
  selectedProduct: any = null;
  products: Product[] = [];
  categories: Category[]=[];
  showAlert = false;
  subcategoria: any = null;


  constructor(private _productService: ProductService,
    private _categoryService: CategoryService
  ){}
  
  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();


  }
  

  loadProducts() {
    this._productService.getProducts()
      .subscribe({
        next: (result: Product[]) => {
          this.products = result;
          console.log(this.products);
        },
        error: (error: any) => {
          console.error('Error al obtener productos:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }


  loadCategories() {
    this._categoryService.getCategories()
      .subscribe({
        next: (result: Category[] ) => {
          this.categories= result;
          console.log('categorias',this.categories);
        },
        error: (error: any) => {
          console.error('Error al obtener categories:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }

  openModal(product: any): void {
    this.selectedProduct = product;
    
    (document.getElementById('my_modal_4') as HTMLDialogElement).showModal();
  }


  onOfferSelected(selectedOfferId: any): void {
    if (this.selectedProduct && selectedOfferId !== null) {
      this.selectedProduct.id_offer = selectedOfferId;
      console.log('producto antes de actualiza:', this.selectedProduct);
      this.updateProdut(this.selectedProduct.id_offer, this.selectedProduct.id);
    }if(selectedOfferId === null){
        console.log("entro a null");
        this.updateProdut(null, this.selectedProduct.id);
    }
    
    (document.getElementById('my_modal_4') as HTMLDialogElement).close();
    

  }

  updateProdut(id_offer: any, id_product: string) {
    this._productService.AssignProductToOffer(id_offer, id_product).subscribe({
      next: (result) => {
        console.log('Actualización exitosa:', result);
      },
      error: (error: any) => {
        console.error('Error al actualizar producto:', error);
      },
      complete: () => {
        console.log('Solicitud completada');
      },
    });
  }

  getSubcategory(id: string) {
    this._categoryService.getSubcategories(id).subscribe({
      next: (result) => {
        console.log('get sub exitosa:', result);
        this.subcategoria = result;
      },
      error: (error: any) => {
        console.error('Error al obtener categoria:', error);
      },
      complete: () => {
        console.log('Solicitud completada');
      },
    });
  } 
  
  assignProductToCategory(id_product: string, id_category: string){
    this.getSubcategory(id_category);
    if (this.subcategoria !== null) {
      this._productService.AssignProductToCategory(id_product, id_category).subscribe({
        next: (result) => {
          this.showAlert = true;
          console.log('Actualización exitosa:', result);
          setTimeout(() => { this.showAlert = false; }, 3000);
        },
        error: (error: any) => {
          console.error('Error al actualizar producto:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        },
      });
    } else {
      console.warn('intento de sub categoria');
    }
  }



  

  
}

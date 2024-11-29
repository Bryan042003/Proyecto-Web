import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/Product.service';
import { AlertsComponent } from '../../components/alerts/alerts.component';
import { NoAlertsComponent } from '../no-alerts/no-alerts.component';
import { privateDecrypt } from 'crypto';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-produts-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoAlertsComponent,
    AlertsComponent

  ],
  templateUrl: './produts-admin.component.html',
  styleUrl: './produts-admin.component.scss'
})
export class ProdutsAdminComponent {
  showAlert = false;
  showNoAlert = false;
  products: Product[] = [];
  isEditMode: boolean = false;
  constructor(
    private _productService: ProductService
  ) { }


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
          console.error('Error al obtener productos:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }

  public productForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500)
    ]),
    price: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0)
    ]),
    brand: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    stock: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0)
    ]),
    technical_stuff: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000)
    ]),
    photo: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ])
  });


  onSubmit() {
    if (this.productForm.valid) {
      const formData = {
        ...this.productForm.value,
        price: Number(this.productForm.value.price),
        stock: Number(this.productForm.value.stock)
      };
      if (this.isEditMode) {

        const id = formData.id ? formData.id.toString() : '';
        this.editFuntion(id, formData);
      }

      else {
        this._productService.createProduct(formData)
          .subscribe({
            next: (result: any) => {
              console.log('Producto creado con éxito:', result);
              this.loadProducts();
              this.showAlert = true;
              this.productForm.reset();
              setTimeout(() => { this.showAlert = false; }, 3000);
            },
            error: (error: any) => {
              console.error('Error al crear producto:', error);
              this.showNoAlert = true;
              setTimeout(() => { this.showNoAlert = false; }, 3000);
            },
            complete: () => {
              console.log('Creación completada');
            }
          });
      }
    } else {
      console.log('Formulario inválido');
      this.productForm.markAllAsTouched();
      this.showNoAlert = true;
      setTimeout(() => { this.showNoAlert = false; }, 3000);
    }
  }



  onEdit(data: Product) {
    this.isEditMode = true;

    this.productForm.patchValue({
      id: data.id,
      name: data.name,
      description: data.description,
      price: Number(data.price),
      brand: data.brand,
      stock: data.stock,
      technical_stuff: data.technical_stuff,
      photo: data.photo

    });
  }

  editFuntion(id: string, data: any) {

    this._productService.updateProduct(id, data).
      subscribe({
        next: (result: any) => {
          console.log("update completo:", result);
          this.showAlert = true;
          this.productForm.reset();
          this.productForm.patchValue({ photo: '' });
          setTimeout(() => { this.showAlert = false; }, 3000);
          this.loadProducts();
          this.isEditMode = false;
        },
        error: (error: any) => {
          console.error('Error al update producto:', error);
          this.showNoAlert = true;
          setTimeout(() => { this.showNoAlert = false; }, 3000);
        },
        complete: () => {
          console.log('update completado');
        }
      })
  }

  onDelete(id: string){
    this._productService.deleteProduct(id).
    subscribe({
      next: (result: any) => {
        console.log('products:', result);
        this.loadProducts();
      },
      error: (error: any) => {
        console.error('Error al eliminar product:', error);
        this.showNoAlert = true;
        setTimeout(() => { this.showNoAlert = false; }, 3000);
      },
      complete: () => {
        console.log('Creación completada');
      }
    })
  }

}

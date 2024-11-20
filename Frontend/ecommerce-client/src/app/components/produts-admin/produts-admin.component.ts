import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/Product.service';
import { AlertsComponent } from '../../components/alerts/alerts.component';
import { NoAlertsComponent } from '../no-alerts/no-alerts.component';
import { privateDecrypt } from 'crypto';

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

  constructor(
    private _productService: ProductService
  ) { }

  public productForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(500)
    ]),
    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0)
    ]),
    brand: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    stock: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0)
    ]),
    technical_stuff: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(1000)
    ]),
    photo: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(255)
    ])
  });

  onSubmit() {
    if (this.productForm.valid) {
      this._productService.createProduct(this.productForm).
        subscribe({
          next: (result: any) => {
            console.log('Usuario creado con éxito:', result);
            this.showAlert = true; 
            this.productForm.reset();
            setTimeout(() => { this.showAlert = false; }, 3000);
          },
          error: (error: any) => {
            console.error('Error al crear producto:', error);
            this.showNoAlert = true; 
            console.table(this.productForm.value);
            setTimeout(() => { this.showNoAlert = false; }, 3000);
          },
          complete: () => {
            console.log('Creación completada');
          }
        });
    } else {
      console.log('Formulario inválido');
      this.productForm.markAllAsTouched();
      this.showNoAlert = true; 
      console.table(this.productForm.value);
      setTimeout(() => { this.showNoAlert = false; }, 3000);
    }
  }


}

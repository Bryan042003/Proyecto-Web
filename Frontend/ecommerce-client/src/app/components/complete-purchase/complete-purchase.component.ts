import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Order } from '../../models/order.model';
import { AlertsComponent } from '../alerts/alerts.component';
import { AuthService } from '../../services/Auth.service';
import { User } from '../../models/user.model';
import { OrderService } from '../../services/Order.service';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-complete-purchase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlertsComponent
  ],
  templateUrl: './complete-purchase.component.html',
  styleUrl: './complete-purchase.component.scss'
})
export class CompletePurchaseComponent implements OnInit {


  public contactForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[A-Za-z\\s]+$'),
      Validators.maxLength(50)  // Máximo 50 caracteres
    ]),
    last_name: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[A-Za-z\\s]+$'),
      Validators.maxLength(50)
    ]),
    specific_address: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(200)  // Limita la dirección a 200 caracteres
    ]),
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[0-9]{8}$')
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ])
  });

  public creditCardForm = new FormGroup({
    card_number: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[0-9]{16}$'),
    ]),
    cardholder_name: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[A-Za-z\\s]+$'),
      Validators.maxLength(50),
    ]),
    expiration_date: new FormControl<string>('', [
      Validators.required,
      this.expirationDateValidator, // Validación personalizada
    ]),
    cvv: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[0-9]{3,4}$'),
    ]),
    terms: new FormControl<boolean>(false, [Validators.requiredTrue]),
  });


  cartProducts: Array<Product & { quantity: number }> = [];
  subtotal: number = 0; // Variable para almacenar el total
  total: number = 0; // Variable para almacenar el total
  IVA: number = 0.13; // Variable para almacenar el IVA
  user: User | undefined;
  showAlert = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.user = this.authService.getDecodedAccessToken(this.localStorageService.getItem('token'));

    this.cartProducts = Object.values(this.localStorageService.getAllProducts());
    this.calculateSubtotal();
    this.calculateIVA();
    this.calculateTotal();

  }

  onSubmitContact() {
    if (this.contactForm.valid) {
      console.log('Formulario válido  🚀');
      console.log("usuario: ", this.user);
      console.log(this.contactForm.value);
      console.log(this.creditCardForm.value);

      this.orderService.createOrder({ id_user: this.user?.id, total_price: this.total }).subscribe({
        next: (order: any) => {
          this.cartProducts.forEach((product) => {
            console.log('id_order:', order.order.id);
            console.log('Producto:', product.id);
            console.log('Cantidad:', product.quantity);

            this.orderService.addProductToOrder({ id_order: order.order.id, id_product: product.id, quantity: product.quantity })
              .subscribe({
                next: (result: any) => {
                  console.log('Producto agregado:', result);

                }, error: (error: any) => {
                  console.error('Error al agregar producto:', error);

                }, complete: () => {
                  console.log('agregado');
                }

              });
          });
        },
        error: (error: any) => {
          console.error('Error al crear la orden:', error);
        }
      });

    } else {
      console.log('Formulario inválido');
      this.contactForm.markAllAsTouched(); // Marca todos los controles como "tocados" para mostrar errores
      this.creditCardForm.markAllAsTouched(); // Marca todos los controles como "tocados" para mostrar errores
      console.log(this.contactForm.value);
      console.log(this.creditCardForm.value);
    }
  }

  onTermsChange(event: any) {
    this.creditCardForm.controls['terms'].setValue(event.target.checked);
  }


  expirationDateValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;

    if (!regex.test(value)) {
      return { invalidFormat: true };
    }

    const [month, year] = value.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { expired: true };
    }

    return null;
  }


  ShoppingCartDelete(productId: number): void {
    this.localStorageService.removeProduct(productId);
    this.cartProducts = Object.values(this.localStorageService.getAllProducts());
    this.calculateSubtotal();
    this.calculateIVA();
    this.calculateTotal();
    window.location.reload();

  }

  // Función para incrementar el contador
  incrementQuantity(product: Product) {
    const newQuantity = this.localStorageService.getProductQuantity(product.id) + 1;

    this.localStorageService.updateProductQuantity(product.id, newQuantity);

    this.cartProducts = [...Object.values(this.localStorageService.getAllProducts())];

    this.calculateSubtotal();
    this.calculateIVA();
    this.calculateTotal();

    window.location.reload();
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

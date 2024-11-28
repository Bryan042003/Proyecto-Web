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
import { UsersService } from '../../services/Users.service';
import { AddressesService } from '../../services/Addresses.service';
import { Address } from '../../models/address.model';
import { AlertErrorComponent } from "../alert-error/alert-error.component";




@Component({
  selector: 'app-complete-purchase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlertsComponent,
    AlertErrorComponent
],
  templateUrl: './complete-purchase.component.html',
  styleUrl: './complete-purchase.component.scss'
})
export class CompletePurchaseComponent implements OnInit {



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
      Validators.pattern('^(0[1-9]|1[0-2])/\\d{2}$'), // Patrón MM/YY
    ]),
    cvv: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[0-9]{3,4}$'),
    ])
  });


  cartProducts: Array<Product & { quantity: number }> = [];
  subtotal: number = 0; // Variable para almacenar el total
  total: number = 0; // Variable para almacenar el total
  IVA: number = 0.13; // Variable para almacenar el IVA
  user: User | undefined;
  showAlert = false;
  userInfo: User | undefined;
  address: Address | undefined;

  message = "No hay stock suficiente para agregar más unidades de este producto.";
  noStock: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private usersService: UsersService,
    private addressesService: AddressesService
  ) { }

  ngOnInit() {
    this.user = this.authService.getDecodedAccessToken(this.localStorageService.getItem('token'));

    if (this.user) {
      this.usersService.getUser(this.user.id.toString()).subscribe((user) => {
        this.userInfo = user;
        this.addressesService.getAddress(this.userInfo?.id_address.toString()).subscribe((address) => {
          this.address = address;
        });
      });
    }    

    this.cartProducts = Object.values(this.localStorageService.getAllProducts());
    this.calculateSubtotal();
    this.calculateIVA();
    this.calculateTotal();

  }

  onSubmitContact() {
    if ( this.creditCardForm.valid) {
      console.log('Formulario válido  🚀');
      console.log("usuario: ", this.user);
      console.log(this.creditCardForm.value);
      let counter = 0;

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
                  counter++;
                  if (counter === this.cartProducts.length) {
                    this.showAlert = true;
                    setTimeout(() => {
                      this.showAlert = false;
                      this.localStorageService.removeItem('shoppingCart');
                      
                      //window.location.reload();
                      const element = document.getElementById('main-content');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                      this.router.navigate(['/store/order-complete/', order.order.id]);
                    }, 3000);
                  }

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
      this.creditCardForm.markAllAsTouched(); // Marca todos los controles como "tocados" para mostrar errores
      console.log(this.creditCardForm.value);
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

  // Función para incrementar el contador
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

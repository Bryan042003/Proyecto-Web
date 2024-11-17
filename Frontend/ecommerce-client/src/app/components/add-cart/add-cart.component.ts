import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { LocalStorageService } from '../../services/LocalStorage.service';

@Component({
  selector: 'app-add-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-cart.component.html',
  styleUrl: './add-cart.component.scss'
})
export class AddCartComponent {
  @Input()
  product!: Product;

  constructor(private localStorageService: LocalStorageService) { }

  addLocalStorageCart(): void {
    this.localStorageService.saveProduct(this.product);
    window.location.reload(); 
  }

}

import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { LocalStorageService } from '../../services/LocalStorage.service';

@Component({
  selector: 'app-add-whislist',
  standalone: true,
  imports: [],
  templateUrl: './add-whislist.component.html',
  styleUrl: './add-whislist.component.scss'
})
export class AddWhislistComponent {

  @Input()
  product!: Product;

  constructor(private localStorageService: LocalStorageService) { }

  addLocalStorageWhishlist(): void {
    this.localStorageService.saveProductWish(this.product);
    window.location.reload();
  }

}

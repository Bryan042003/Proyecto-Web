import { Component } from '@angular/core';
import { PriceViewComponent } from "../price-view/price-view.component";
import { StockStatusComponent } from "../stock-status/stock-status.component";
import { AddCartComponent } from "../add-cart/add-cart.component";
import { InfoProductComponent } from "../info-product/info-product.component";
import { LocalStorageService } from '../../services/LocalStorage.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whishlist',
  standalone: true,
  imports: [CommonModule,PriceViewComponent, StockStatusComponent, AddCartComponent, InfoProductComponent],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.scss'
})
export class WhishlistComponent {

  whishProducts: Array<Product & { quantity: number }> = [];
  selectedItems: any[] = []; // Lista para almacenar los elementos seleccionados


  constructor(private localStorageService: LocalStorageService) { }


  ngOnInit() {

    this.whishProducts = Object.values(this.localStorageService.getAllProductsWish());

  }

  WhishlistDelete(): void {
    // Elimina cada producto seleccionado del local storage
    this.selectedItems.forEach(item => {
      this.localStorageService.removeProductWish(item.id);
      console.log("eliminado de lista", item.name);
    });

    this.whishProducts = Object.values(this.localStorageService.getAllProductsWish());
  }

  toggleItem(event: Event, item: any) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedItems.push(item); // Agregar el elemento si está marcado
    } else {
      // Quitar el elemento si está desmarcado
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
    console.log("eliminados",this.selectedItems);
  }


}

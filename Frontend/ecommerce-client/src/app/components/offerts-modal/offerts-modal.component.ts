import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OffersService } from '../../services/Offers.service';
import { CommonModule } from '@angular/common';
import { Offer } from '../../models/offer.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/Product.service';

@Component({
  selector: 'app-offerts-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offerts-modal.component.html',
  styleUrl: './offerts-modal.component.scss'
})
export class OffertsModalComponent {
  offerts: Offer[] = [];
  selectedIds: number | null = null;
  @Output() id_offert = new EventEmitter<number | null>();
  @Input() selectedProduct: Product | null = null;
  constructor(
    private _offerService: OffersService,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadOfferts();
  }


  loadOfferts() {
    this._offerService.getOffers()
      .subscribe({
        next: (result: Offer[]) => {
          //this.offerts = result;
          this.offerts = result
          console.log(this.offerts);
        },
        error: (error: any) => {
          console.error('Error al obtener ofertas:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }


  toggleSelection(id: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedIds = id; // 
      this.selectedProduct!.id_offer = id;
      this.id_offert.emit(this.selectedIds);

    }else{
      this.selectedIds = null;
      this.id_offert.emit(this.selectedIds);
    }

 
    console.log('Selected IDs:', this.selectedIds, isChecked); 
  }

  updateProdut(id: string, data: Product) {
    this._productService.updateProduct(id, data).subscribe({
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


} 

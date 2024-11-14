import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { Offer } from '../../models/offer.model';
import { OffersService } from '../../services/Offers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-price-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-view.component.html',
  styleUrl: './price-view.component.scss'
})
export class PriceViewComponent {
  @Input()
  product!: Product;
  descount: number = 0;

  offer: Offer | undefined;

  constructor(private offerservice: OffersService) { }

  ngOnInit() {
    if (this.product.id_offer !== null) {
      this.offerservice.getOffer(this.product.id_offer.toString()).subscribe(offer => {
        this.offer = offer;
        this.descount = this.offer?.discount || 0;
      });
    }
  }

}

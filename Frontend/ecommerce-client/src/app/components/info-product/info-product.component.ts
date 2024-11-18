import { Component, Input } from '@angular/core';
import { RouterModule} from '@angular/router';
import { Product } from '../../models/product.model';
import { ViewportScroller } from '@angular/common';



@Component({
  selector: 'app-info-product',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './info-product.component.html',
  styleUrl: './info-product.component.scss'
})
export class InfoProductComponent {
  @Input()
  product: Product | undefined;

  constructor(private viewportScroller: ViewportScroller) { }

  scrollToMainContent() {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
}

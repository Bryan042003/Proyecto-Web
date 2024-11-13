import { Component, Input } from '@angular/core';
import { RouterModule} from '@angular/router';
import { Product } from '../../models/product.model';


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

}

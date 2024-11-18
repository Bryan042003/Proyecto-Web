import { Component } from '@angular/core';
import { SliderDayPromotionsComponent } from '../slider-day-promotions/slider-day-promotions.component';
import { SliderHighlightProductComponent } from "../slider-highlight-product/slider-highlight-product.component";

@Component({
  selector: 'app-sliders-shop',
  standalone: true,
  imports: [SliderDayPromotionsComponent, SliderHighlightProductComponent],
  templateUrl: './sliders-shop.component.html',
  styleUrl: './sliders-shop.component.scss'
})
export class SlidersShopComponent {

}

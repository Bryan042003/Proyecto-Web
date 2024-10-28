import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SloganComponent } from '../../components/slogan/slogan.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { SliderDayPromotionsComponent } from "../../components/slider-day-promotions/slider-day-promotions.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SloganComponent, FooterComponent, CarouselComponent, SliderDayPromotionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

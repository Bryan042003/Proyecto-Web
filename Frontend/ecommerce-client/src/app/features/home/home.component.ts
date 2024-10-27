import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SloganComponent } from '../../components/slogan/slogan.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarouselComponent } from "../../components/carousel/carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SloganComponent, FooterComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

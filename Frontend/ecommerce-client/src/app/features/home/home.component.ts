import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SloganComponent } from '../../components/slogan/slogan.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SloganComponent, FooterComponent, CarouselComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}

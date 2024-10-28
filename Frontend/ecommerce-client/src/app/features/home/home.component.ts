import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SloganComponent } from '../../components/slogan/slogan.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { SliderDayPromotionsComponent } from "../../components/slider-day-promotions/slider-day-promotions.component";
import { FeaturedProductsComponent } from "../../components/featured-products/featured-products.component";
import { CommonModule } from '@angular/common';
import { ProductsPerCategoryComponent } from "../../components/products-per-category/products-per-category.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SloganComponent, FooterComponent, CarouselComponent, SliderDayPromotionsComponent, FeaturedProductsComponent, ProductsPerCategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //pagina principal
  principalPage = true;
  
  principalPageProducts = true;

  //paginas dentro de la principal
  login = false;
  account = false;
  personalInformation = false;
  orderHistory = false;
  directions = false;
  paymentMethod = false;

  viewProduct = false;
 

//paginas fuera de la principal
  whishlist = false;
  cart = false;



}

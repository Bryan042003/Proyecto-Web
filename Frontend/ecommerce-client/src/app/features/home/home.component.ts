import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SloganComponent } from '../../components/slogan/slogan.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { SliderDayPromotionsComponent } from "../../components/slider-day-promotions/slider-day-promotions.component";
import { FeaturedProductsComponent } from "../../components/featured-products/featured-products.component";
import { CommonModule } from '@angular/common';
import { ProductsPerCategoryComponent } from "../../components/products-per-category/products-per-category.component";
import { ProductDetailsComponent } from "../../components/product-details/product-details.component";
import { PersonalInformationComponent } from "../../components/personal-information/personal-information.component";
import { OrderHistoryComponent } from "../../components/order-history/order-history.component";
import { DirectionComponent } from "../../components/direction/direction.component";
import { LoginComponent } from "../authentication/login/login.component";
import { WhishlistComponent } from "../../components/whishlist/whishlist.component";
import { ShoppingCartComponent } from "../../components/shopping-cart/shopping-cart.component";
import { CompletePurchaseComponent } from "../../components/complete-purchase/complete-purchase.component";
import { OrderCompleteComponent } from "../../components/order-complete/order-complete.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SloganComponent, FooterComponent, CarouselComponent, SliderDayPromotionsComponent, FeaturedProductsComponent, ProductsPerCategoryComponent, ProductDetailsComponent, PersonalInformationComponent, OrderHistoryComponent, DirectionComponent, LoginComponent, WhishlistComponent, ShoppingCartComponent, CompletePurchaseComponent, OrderCompleteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //pagina principal
  principalPage = false;
  
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
  whishlist = true;
  cart = false;



}

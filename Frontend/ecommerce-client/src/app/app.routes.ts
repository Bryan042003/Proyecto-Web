import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { SliderDayPromotionsComponent } from './components/slider-day-promotions/slider-day-promotions.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { DirectionComponent } from './components/direction/direction.component';
import { ProductsPerCategoryComponent } from './components/products-per-category/products-per-category.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CompletePurchaseComponent } from './components/complete-purchase/complete-purchase.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            { path: '', redirectTo: 'slider-day-promotions', pathMatch: 'full' }, 
            { path: 'payment-method', component: PaymentMethodComponent },
            { path: 'login', component: LoginComponent },
            { path: 'whishlist', component: WhishlistComponent },
            { path: 'slider-day-promotions', component: SliderDayPromotionsComponent },
            { path: 'product-details', component: ProductDetailsComponent },
            {path: 'personal-information', component: PersonalInformationComponent},
            {path: 'order-history', component: OrderHistoryComponent},
            {path: 'direction', component: DirectionComponent},
            {path: 'products-per-category', component: ProductsPerCategoryComponent},
            {path: 'shopping-cart', component: ShoppingCartComponent},
            {path: 'complete-purchase', component: CompletePurchaseComponent},
            {path: 'order-complete', component: OrderCompleteComponent}

        ]
    },
];

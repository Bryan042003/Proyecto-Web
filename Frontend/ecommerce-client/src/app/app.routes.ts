import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { DirectionComponent } from './components/direction/direction.component';
import { ProductsPerCategoryComponent } from './components/products-per-category/products-per-category.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CompletePurchaseComponent } from './components/complete-purchase/complete-purchase.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete.component';
import { AuthGuard } from './authGuard/auth.guard';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { SlidersShopComponent } from './components/sliders-shop/sliders-shop.component';
import { ProdutsAdminComponent } from './components/produts-admin/produts-admin.component';
import { OrdersAdminComponent } from './components/orders-admin/orders-admin.component';
import { InventoryAdminComponent } from './components/inventory-admin/inventory-admin.component';
import { StatisticsAdminComponent } from './components/statistics-admin/statistics-admin.component';
import { OffersAdminComponent } from './components/offers-admin/offers-admin.component';

export const routes: Routes = [
    {
        path: 'store', component: HomeComponent, children: [
            { path: '', component: SlidersShopComponent },
            { path: 'login', component: LoginComponent },
            { path: 'whishlist', component: WhishlistComponent },
            { path: 'product-details/:id', component: ProductDetailsComponent },
            { path: 'personal-information', component: PersonalInformationComponent },
            { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard] },
            { path: 'direction', component: DirectionComponent },
            { path: 'products-per-category/:id', component: ProductsPerCategoryComponent },
            { path: 'shopping-cart', component: ShoppingCartComponent },
            { path: 'complete-purchase', component: CompletePurchaseComponent },
            { path: 'order-complete/:id', component: OrderCompleteComponent }
        ]
    },
    { path: 'admin_dashboard', component: AdminDashboardComponent, children:[
        {path: 'users-admin', component: UsersAdminComponent},
        {path: 'produts-admin', component: ProdutsAdminComponent},
        {path: 'orders-admin', component: OrdersAdminComponent},
        {path: 'inventory-admin', component: InventoryAdminComponent},
        {path: 'statistics-admin', component: StatisticsAdminComponent},
        {path: 'offers-admin', component: OffersAdminComponent}
    ]
     },

    { path: 'logistics-dashboar', component: LoginComponent},
    { path: '', redirectTo: 'store', pathMatch: 'full' },
    { path: '**', redirectTo: 'store' }
];


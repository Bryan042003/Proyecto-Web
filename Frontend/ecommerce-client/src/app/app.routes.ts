import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import path from 'path';

export const routes: Routes = [
    {
        path: '',component:HomeComponent, children:[
            {path:'payment',component:PaymentMethodComponent},
            {path:'login',component:LoginComponent},
            {path:'whishlist',component:WhishlistComponent}
        ]
   

    },

];
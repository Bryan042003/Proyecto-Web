import { Component } from '@angular/core';
import { OrderService } from '../../services/Order.service';
import { UsersService } from '../../services/Users.service';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { AuthService } from '../../services/Auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule} from '@angular/router';





@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
  constructor(private orderService: OrderService,private localStorageService: LocalStorageService, private authService: AuthService,) {}
  orders: Order[] = [];
  userActive: User | undefined;

  ngOnInit() {

    this.userActive = this.authService.getDecodedAccessToken(this.localStorageService.getItem('token'));
    if(this.userActive){
      this.orderService.getOrdersByUser(this.userActive?.id.toString()).subscribe((data) => {
        this.orders = data;
        console.log(this.orders);
      });
    }
    
  }

}

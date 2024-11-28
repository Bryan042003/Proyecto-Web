import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/Order.service';
import { UsersService } from '../../services/Users.service';
import { AddressesService } from '../../services/Addresses.service';
import { User } from '../../models/user.model';
import { Address } from '../../models/address.model';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-order-complete',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order-complete.component.html',
  styleUrl: './order-complete.component.scss'
})
export class OrderCompleteComponent implements OnInit {
  order!: string;
  orderInfo: Order | undefined; ;
  orderUser: User | undefined;;
  addressUser: Address | undefined;
  day: any;
  month: any;
  year: any;
  orderProducts: any;


  constructor( private router: Router,private route: ActivatedRoute, private orderService:OrderService, private usersService:UsersService, private addressesService:AddressesService) {  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.order = params.get('id') || '';
      this.orderService.getOrder(this.order).subscribe((order) => {
        this.orderInfo = order;
        this.orderService.getProductsByOrder(this.order).subscribe((products) => {
          this.orderProducts = products;
          console.log(this.orderProducts);
        });

        let date = new Date(this.orderInfo.date);
        this.day = date.getUTCDate();
        this.month = date.getUTCMonth() + 1;
        this.year = date.getUTCFullYear();

        this.usersService.getUser(this.orderInfo?.id_user.toString()).subscribe((user) => {
          this.orderUser = user;
          this.addressesService.getAddress(this.orderUser?.id_address.toString()).subscribe((address) => {
            this.addressUser = address;
          });
        });

      });
    });
  }
  navigate(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/store' ]);
  }
}

import { Component } from '@angular/core';
import { OrderCompleteComponent } from '../order-complete/order-complete.component';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/Order.service';

interface Data {
  id: string;
  status: string;
}

@Component({
  selector: 'app-orders-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-admin.component.html',
  styleUrl: './orders-admin.component.scss'
})
export class OrdersAdminComponent {
  orders: Order[] = [];

  constructor(private _orderService: OrderService) { }





  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this._orderService.getOrders().
      subscribe({
        next: (result: any) => {
          this.orders = result
          console.log(result);
        },
        error: (error: any) => {
          console.error('Error al recuperar ordenes:', error);
        },
        complete: () => {
          console.log('Creación completada');
        }

      })
  }
  onStatusChange(event: Event, orderId: number): void {
    const status = (event.target as HTMLSelectElement).value;

    const data = {
      id_order: orderId,
      status: status,
    };

    console.log(`Actualizando orden:`, data);

    this.updateOrderStatus(data);
  }

  updateOrderStatus(data: { id_order: number; status: string }): void {
    this._orderService.updateOrderStatus(data).subscribe({
      next: (result: any) => {
        console.log(`Orden actualizada:`, result);
      },
      error: (error: any) => {
        console.error('Error al actualizar el estado de la orden:', error);
      },
      complete: () => {
        console.log('Actualización completada');
      },
    });
  }
}

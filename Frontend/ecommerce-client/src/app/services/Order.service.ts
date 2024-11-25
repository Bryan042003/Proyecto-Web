import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private baseUrl = `${environment.baseUrl}orders`;

    constructor(private http: HttpClient) { }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl);
    }

    getOrder(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.baseUrl}/id/${id}`);
    }

    createOrder(data: any): Observable<any> {
        /*
        data ={
            id_user,
            total_price,
        }
        */

        return this.http.post(`${this.baseUrl}/create`, data);
    }

    addProductToOrder(data: any): Observable<any> {
        /*
        data ={
            id_order,
            id_product,
            quantity,
        }
        */

        return this.http.put(`${this.baseUrl}/add-product`, data);
    }

    updateOrderStatus(data:any): Observable<Order> {
        /*
        data ={
            id_order,
            status,
        }
        */
        return this.http.patch<Order>(`${this.baseUrl}/update-status`, data);
    }
}
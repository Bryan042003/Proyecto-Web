import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private baseUrl = `${environment.baseUrl}products`;
    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl);
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/id/${id}`);
    }

    getProductByName(name: string): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/name/${name}`);
    }

    createProduct(data: any): Observable<any> {
        /*
        data ={
            name,
            description,
            price,
            brand,
            stock,
            technical_stuff,
            photo,
        }
        */

        return this.http.post(`${this.baseUrl}/create`, data);
    }

    updateProduct(id: string, data: Product): Observable<Product> {

        return this.http.put<Product>(`${this.baseUrl}/update/${id}`, data);
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete/id/${id}`);
    }

    reduceStock(id: string, quantity: number): Observable<any> {
        return this.http.put(`${this.baseUrl}/reduce-stock/${id}`, {quantity});
    }
}
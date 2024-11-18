import { HttpClient, HttpParams } from '@angular/common/http';
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
        return this.http.put(`${this.baseUrl}/reduce-stock/${id}`, { quantity });
    }

    getProductsByCategory(id: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/by-category/${id}`);
    }

    getProductsByBrandAndCategory(brand: string, id_category: string): Observable<Product[]> {
        let params = new HttpParams();
        params = params.append('brand', brand);
        params = params.append('id_category', id_category);

        return this.http.get<Product[]>(`${this.baseUrl}/by-brand-and-category`, { params });
    }

    getProductsByPricesAndCategory(min_price: number, max_price: number, id_category: string): Observable<Product[]> {
        let params = new HttpParams();
        params = params.append('min_price', min_price);
        params = params.append('max_price', max_price);
        params = params.append('id_category', id_category);

        return this.http.get<Product[]>(`${this.baseUrl}/by-prices-and-category`, { params });
    }

    getTopProductsbySalesAndCategory(id_category: string,limit:number): Observable<Product[]> {
        let params = new HttpParams();
        params = params.append('id_category', id_category);
        params = params.append('limit', limit);
        return this.http.get<Product[]>(`${this.baseUrl}/top-sales-and-category`, { params });
    }
    
    getHighlightedProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/highlighted`);
    }

    /*Product Category: Methods related to associate product to category*/

    AssignProductToCategory(id_product: string, id_category: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/assign-category`, { id_product, id_category });
    }

    UpdateProductCategory(id:string,id_product: string, id_category: string): Observable<any> { 
        return this.http.put(`${this.baseUrl}/update-category/${id}`, { id_product, id_category });
    }

    DeleteProductCategory(id:string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete-category/${id}`);
    }

    /*Product Offer: Methods related to associate product to offer*/
    AssignProductToOffer(id_product: string, id_offer: string): Observable<any> {
        //If you want to quit the offer, just send an empty string as id_offer
        return this.http.patch(`${this.baseUrl}/assign-offer`, { id_product, id_offer });
    }

    
}
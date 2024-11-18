import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CategoryService{
    private baseUrl = `${environment.baseUrl}categories`;
    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> { //Get all categories with their subcategories
        return this.http.get(this.baseUrl);
    }

    getCategory(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/id/${id}`);
    }

    getSubcategories(id: string): Observable<any> { //Get all subcategories of a category
        return this.http.get(`${this.baseUrl}/subcategories/${id}`);
    }

    getParentCategory(id: string): Observable<any> { //Get the parent category of a subcategory
        return this.http.get(`${this.baseUrl}/parentCategory/${id}`);
    }

    getCategoryByProduct(id_product: string): Observable<any> { //Get the category of a product
        return this.http.get(`${this.baseUrl}/id_product/${id_product}`);
    }   

}
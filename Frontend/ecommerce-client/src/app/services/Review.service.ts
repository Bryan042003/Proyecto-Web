import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
    private baseUrl = `${environment.baseUrl}reviews`;
    constructor(private http: HttpClient) { }
    
    getReviews(): Observable<Review[]> {
        return this.http.get<Review[]>(this.baseUrl);
      }
    
    getReview(id: string): Observable<Review> {
        return this.http.get<Review>(`${this.baseUrl}/id/${id}`);
      }

    getReviewByProduct(id_product: string): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.baseUrl}/product/${id_product}`);
    }
    
    createReview(data: Review): Observable<Review> {
        console.log(data);
        /*
        data ={
            score,
            description,
            id_product,
            id_user
        }
        */
        
        return this.http.post<Review>(`${this.baseUrl}/create`, data);
    }
    
    updateReview(id: string, data: Review): Observable<Review> {
        /*
        data = {
            id,
            score,
            description,
            id_product,
            id_user
        }
        */
        return this.http.put<Review>(`${this.baseUrl}/update/${id}`, data);
    }
    
    deleteReview(id: string): Observable<Review> {
        return this.http.delete<Review>(`${this.baseUrl}/delete/${id}`);
    }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Offer } from '../models/offer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OffersService {
    private baseUrl = `${environment.baseUrl}offers`;
    constructor(private http: HttpClient) { }
    
    getOffers(): Observable<Offer[]> {
        return this.http.get<Offer[]>(this.baseUrl);
      }
    
    getOffer(id: string): Observable<Offer> {
        return this.http.get<Offer>(`${this.baseUrl}/id/${id}`);
      }

    
    createOffer(data: Offer): Observable<Offer> {
        /*
        data ={
            discount,
            start_date,
            end_date (optional) 
        }

        dates format = 'YYYY-MM-DD HH:MM:SS'
        */
        return this.http.post<Offer>(`${this.baseUrl}/create`, data);
    }
    
    updateOffer(id: string, data: Offer): Observable<Offer> {

        return this.http.put<Offer>(`${this.baseUrl}/update/${id}`, data);
    }
    
    deleteOffer(id: string): Observable<Offer> {
        return this.http.delete<Offer>(`${this.baseUrl}/delete/${id}`);
    }
}
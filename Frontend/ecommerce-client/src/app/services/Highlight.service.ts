import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Highlight } from '../models/highlight.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HighlightService {
    private baseUrl = `${environment.baseUrl}highlights`;
    constructor(private http: HttpClient) { }
    
    getHighlights(): Observable<Highlight[]> {
        return this.http.get<Highlight[]>(this.baseUrl);
      }
    

    createHighlight(data: any): Observable<any> {
        /*
        data ={
            id_product,
            expired_date
        }
        */
        
        return this.http.post(`${this.baseUrl}/create`, data);
    }

}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class NotificationService{
    private baseUrl = `${environment.baseUrl}notifications`;
    constructor(private http: HttpClient) { }

    getNotifications(): Observable<Notification[]> {
        return this.http.get<Notification[]>(this.baseUrl);
    }

    getNotification(id: string): Observable<Notification> {
        return this.http.get<Notification>(`${this.baseUrl}/id/${id}`);
    }

    deleteNotification(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete/${id}`);
    }
}
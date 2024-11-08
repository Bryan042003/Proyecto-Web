import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
    private baseUrl = `${environment.baseUrl}users`;
    constructor(private http: HttpClient) { }
    
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl);
      }
    
    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/id/${id}`);
      }

    getUserByEmail(email: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/email/${email}`);
    }
    
    createUser(data: any): Observable<any> {
        /*
        data ={
            email,
            name,
            last_name,
            passw,
            role,
            photo,
            phone,
            province,
            canton,
            district,
            postal_code,
            specific_address
        }
        */
        
        return this.http.post(this.baseUrl, data);
    }
    
    updateUser(id: string, data: User): Observable<User> {
        /*
        data = {
            id,
            email,
            name,
            last_name,
            passw,
            role,
            photo,
            phone,
            id_address
        }
        */
        
        return this.http.put<User>(`${this.baseUrl}/${id}`, data);
    }
    
    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.baseUrl}/${id}`);
    }
}




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
        
        return this.http.post(`${this.baseUrl}/create`, data);
    }
    
    updateUser(id: string, data: any): Observable<any> {
        console.log("lo que envio de data",data);
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
        //! ask about this
        return this.http.put<User>(`${this.baseUrl}/update/${id}`, data);
    }

    updatePassword(id: string, current_password: string, new_password:string): Observable<any> {
        return this.http.patch(`${this.baseUrl}/update-password/${id}`, {current_password, new_password});
    }
    
    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.baseUrl}/delete/${id}`);
    }
}




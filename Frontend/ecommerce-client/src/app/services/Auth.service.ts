import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { LocalStorageService } from './LocalStorage.service';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private baseUrl = 'http://localhost:3000/api/auth';
    constructor(private http: HttpClient,private localStorageService:LocalStorageService) { }

    login(data: any): Observable<any> {
        /*
        data ={
            email,
            passw
        }
        */
        
        return this.http.post(this.baseUrl, data);
    }

    getDecodedAccessToken(token: string): any {  //To get the information from the token
        try{
            return jwtDecode(token);
        }
        catch(Error){
            return null;
        }
    }

    isTokenExpired(token: string): boolean {
        const decodedToken = this.getDecodedAccessToken(token);
        if(decodedToken === null){
            return true;
        }
        const expirationDate = decodedToken.exp;
        const currentDateTime = new Date().getTime() / 1000;
        return expirationDate < currentDateTime;
    }

    logout(): void {
        this.localStorageService.removeItem('token');
    }
}
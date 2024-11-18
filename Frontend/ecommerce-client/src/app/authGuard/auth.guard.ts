import { Injectable } from "@angular/core";
import { AuthService } from "../services/Auth.service";
import {Router} from '@angular/router';
import { CanActivate } from "@angular/router";
import { LocalStorageService } from "../services/LocalStorage.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,private route:Router,
        private localStorageService:LocalStorageService) { }

    canActivate(): boolean {
        const token = this.localStorageService.getItem('token');
        if (token === null || this.authService.isTokenExpired(token)) {
            this.route.navigate(['/login']);
            return false;
        }
        return true;
    }


    logged(): boolean {
        const token = this.localStorageService.getItem('token');
        if (token === null || this.authService.isTokenExpired(token)) {
            return false;
        }
        return true;
    }

}
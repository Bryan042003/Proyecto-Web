import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {
    constructor() { }

    setItem(key: string, value: any): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(key, value);
        }
    }

    getItem(key: string): any {
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem(key);
        }

        return null;
    }

    removeItem(key: string): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem(key);
        }
    }

    clear(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.clear();
        }
    }
}


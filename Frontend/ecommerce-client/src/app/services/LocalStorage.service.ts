import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {

    private productKeyShoppingCart = 'shoppingCart';
    private productKeyWishlist = 'wishlist';

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

    // Métodos específicos para productos

    saveProduct(product: Product): void {
        const products = this.getAllProducts();
        if (products[product.id]) {
            // Si el producto ya está en el carrito, incrementamos la cantidad
            products[product.id].quantity += 1;
        } else {
            // Si el producto no está en el carrito, lo agregamos
            products[product.id] = product;
            products[product.id].quantity = 1;
        }
        this.setItem(this.productKeyShoppingCart, JSON.stringify(products));
        this.printAllProducts();
    }

    printAllProducts(): void {
        const allProducts = this.getAllProducts();
    }

    getProduct(productId: number): Product | null {
        const products = this.getAllProducts();
        return products[productId] || null;
    }

    removeProduct(productId: number): void {
        const products = this.getAllProducts();
        delete products[productId];
        this.setItem(this.productKeyShoppingCart, JSON.stringify(products));
    }

    getAllProducts(): { [key: number]: Product } {
        const productsData = this.getItem(this.productKeyShoppingCart);
        return productsData ? JSON.parse(productsData) : {};
    }

    getProductQuantity(productId: number): number {
        const products = this.getAllProducts();
        return products[productId] ? products[productId].quantity : 0;
    }

    updateProductQuantity(productId: number, newQuantity: number): void {
        const products = this.getAllProducts();
        const product = products[productId];

        if (product) {
            if (newQuantity > 0) {
                product.quantity = newQuantity;
                this.setItem(this.productKeyShoppingCart, JSON.stringify(products));
            } else {
                console.warn('La cantidad debe ser mayor que 0');
            }
        } else {
            console.warn('El producto no existe en el carrito');
        }

        this.printAllProducts();
    }


    // Métodos específicos para WHISLIST

    saveProductWish(product: Product): void {
        const products = this.getAllProducts();
        if (products[product.id]) {
            products[product.id] = product;
        }
        this.setItem(this.productKeyWishlist, JSON.stringify(products));
        this.printAllProducts();
    }


}

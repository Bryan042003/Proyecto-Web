import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { OffersService } from './Offers.service';
import { Offer } from '../models/offer.model';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {

    private productKeyShoppingCart = 'shoppingCart';
    private productKeyWishlist = 'wishlist';

    constructor(private offersService: OffersService) { }

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

    async saveProduct(product: Product): Promise<void> {
        const products = this.getAllProducts();
    
        
        let finalPrice = product.price;
        if (product.id_offer != null) {
            const discount = await this.getDiscountById(product.id_offer); 
            console.log('Descuento:', discount);
            if (discount) {
                finalPrice = product.price * (1 - discount);  
                console.log('Precio final con descuento:', finalPrice);
            }
        }
    
        if (products[product.id]) {
            products[product.id].quantity += 1;
            products[product.id].price = finalPrice;
        } else {
            products[product.id] = { ...product, quantity: 1, price: finalPrice }; 
        }
    
        this.setItem(this.productKeyShoppingCart, JSON.stringify(products));
        this.printAllProducts();
    }
    
    async getDiscountById(id: number): Promise<number> {
        try {
            const offer = await this.offersService.getOffer(id.toString()).toPromise(); 
            console.log('Descuento función:', offer?.discount);
            return offer?.discount || 0; 
        } catch (error) {
            console.error('Error al obtener el descuento:', error);
            return 0;  
        }
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

    async saveProductWish(product: Product): Promise<void> {
        const wishlistProducts = this.getAllProductsWish();
         let finalPrice = product.price;
         if (product.id_offer != null) {
             const discount = await this.getDiscountById(product.id_offer); 
             console.log('Descuento:', discount);
             if (discount) {
                 finalPrice = product.price * (1 - discount);  
                 console.log('Precio final con descuento:', finalPrice);
             }
         }
     
        
        if (!wishlistProducts[product.id]) {
            wishlistProducts[product.id] = { ...product, quantity: 1, price: finalPrice }; 
        }
        this.setItem(this.productKeyWishlist, JSON.stringify(wishlistProducts));
    }


    removeProductWish(productId: number): void {
        const wishlistProducts = this.getAllProductsWish();
        if (wishlistProducts[productId]) {
            delete wishlistProducts[productId];
            this.setItem(this.productKeyWishlist, JSON.stringify(wishlistProducts));
        }
    }

    getAllProductsWish(): { [key: number]: Product } {
        const whishData = this.getItem(this.productKeyWishlist);
        return whishData ? JSON.parse(whishData) : {};
    }

    getProductWish(productId: number): Product | null {
        const wishlistProducts = this.getAllProductsWish();
        return wishlistProducts[productId] || null;
    }


}

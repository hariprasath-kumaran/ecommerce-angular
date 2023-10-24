import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { StorageserviceService } from './storageservice.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpclient: HttpClient,
    private storageservice: StorageserviceService
  ) {}
  getallproducts(): Observable<Product[]> {
    return this.httpclient.get<Product[]>('https://fakestoreapi.com/products');
  }
  getLocalProducts(): Product[] {
    return this.storageservice.getCachedProducts();
  }
  getCachedProducts(): Observable<Product[]> {
    let cachedProducts: Product[] = this.storageservice.getCachedProducts();

    return new Observable((observer) => {
      if (cachedProducts.length > 0) {
        observer.next(this.storageservice.getCachedProducts());
      }
      this.getallproducts().subscribe({
        next: (products: Product[]) => {
          // check cachedProducts
          let hasChanged: boolean =
            cachedProducts.length !== products.length &&
            !cachedProducts.every(
              (p, i) => p.id === products[i].id && p.price === products[i].price
            );

          // if cachedProducts are different
          if (!hasChanged) {
            observer.next(products);
            this.storageservice.setProducts(products);
          }
        },
        complete: () => {
          observer.complete();
        },
        error: (error: Error) => {
          observer.error(error);
        },
      });
    });



}
}
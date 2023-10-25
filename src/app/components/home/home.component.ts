import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageserviceService } from 'src/app/services/storageservice.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent{
  Products: Product[] = [];

  cartItems: Cart[] = [];

  constructor(
    private productservices: ProductService,
    private cartservices: CartService,
    private storageservice: StorageserviceService
  ) {
    this.productservices.getallproducts().subscribe({
      next: (data: Product[]) => {
        this.Products = data;
        this.storageservice.setProducts(this.Products);
      },
      complete: () => {
        console.log('completed');
      },
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }


  addToCart(id: number): void {
    this.cartservices.addToCart(id);
  }

  }


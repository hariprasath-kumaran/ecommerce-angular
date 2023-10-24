import { Injectable } from '@angular/core';
import { Users } from '../model/users';
import { Cart } from '../model/cart';
import { Product } from '../model/product';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class StorageserviceService {
  
  constructor() {}
  users: Users[] = [{ id: 1, email: 'hari@gmail.com', password: '123456' }];
  private products: Product[] = [];
  private carts: Cart[] = [];
  private order:Order[]=[]

  
  loadUsers() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  loadCart() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  getCart(): Cart[] {
    let cart = JSON.parse(localStorage.getItem('cart') as string);
    if (cart === null) cart = [];
    return cart;
  }

  setCart(cart: Cart[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getAllUsers(): Users[] {
    return JSON.parse(localStorage.getItem('users') as string);
  }

  setLoggedInUser(user: Users): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser(): Users {
    return JSON.parse(localStorage.getItem('loggedInUser') as string);
  }

  removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }
  setUser(user: Users) {
    if (user) {
      this.users.push({
        id: this.users.length + 1,
        email: user.email,
        password: user.password,
      });
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }

  setProducts(products: Product[]): void {
    localStorage.setItem('product', JSON.stringify(products));
  }

  getCachedProducts(): Product[] {
    let cachedProducts: Product[] = JSON.parse(
      localStorage.getItem('product') as string
    );
    if (!cachedProducts) {
      cachedProducts = [];
    }
    return cachedProducts;
  }
  

}

import { Injectable } from '@angular/core';
import { StorageserviceService } from './storageservice.service';
import { Product } from '../model/product';
import { Cart } from '../model/cart';
import { AuthService } from './auth.service';
import { Users } from '../model/users';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  carts: Product[] = [];

  constructor(
    private productservice: ProductService,
    private storageservice: StorageserviceService,
    private authservice: AuthService
  ) {}

 

  addToCart(id: number) {
    let products: Product[] = this.storageservice.getCachedProducts();
    let product = products.find((p) => p.id === id);
    if (product) {
      let loggedUser: Users = this.authservice.getLoggedInUser();

      
      let cart: Cart[] = this.storageservice.getCart();
      let userCart: Cart = cart.find((c) => c.user.id === loggedUser.id)!;
      if (userCart) {
        let existingCartItem = userCart.cart.find((p) => p.id === id);
        if (existingCartItem) {
          existingCartItem.count! += 1;
        } else {
          userCart.cart.push({ ...product, count: 1 });
        }
      } else {
        cart.push({ user: loggedUser, cart: [{ ...product, count: 1 }] });
      }
      this.storageservice.setCart(cart);
    }
  }

  getUserCart(): Product[] {
    let loggedInUser: Users = this.storageservice.getLoggedInUser();
    let cart: Cart[] = this.storageservice.getCart();

    let userCart: Product[] | undefined = cart.find(
      (c) => c.user.id === loggedInUser.id
    )!.cart;

    if (!userCart) userCart = [];
    return userCart;
  }

  getTotal(): number {
    let userCart = this.getUserCart();
    return userCart.reduce((acc, curr) => {
      acc += curr.count! * parseInt(curr.price)!;
      return acc;
    }, 0);
  }

}

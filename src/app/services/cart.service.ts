import { Injectable } from '@angular/core';
import { StorageserviceService } from './storageservice.service';
import { Product } from '../model/product';
import { Cart } from '../model/cart';
import { AuthService } from './auth.service';
import { Users } from '../model/users';
import { Order } from '../model/order';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  carts: Product[] = [];

  constructor(
    private productservice:ProductService,
    private storageservice: StorageserviceService,
    private authservice: AuthService
  ) {}

  getCount(): number {
    let cart: Cart[] = this.storageservice.getCart();
    let loggedInUser: Users = this.authservice.getLoggedInUser();

    let userCart: Cart | undefined = cart.find(
      (c) => c.user.id === loggedInUser.id
    );

    let count: number = 0;
    if (userCart) {
      for (let product of userCart.product) {
        if (product.count) count += product.count;
      }
    }

    return count;
  }

  addToCart(productId: number, operation: string): void {
    let cart: Cart[] = this.storageservice.getCart();
    let loggedInUser: Users = this.authservice.getLoggedInUser();
    let products: Product[] = this.productservice.getLocalProducts();

    let product: Product | undefined = products.find((p) => p.id === productId);

    if (product) {
      let userCart: Cart | undefined = cart.find(
        (c) => c.user.id === loggedInUser.id
      );

      console.log(userCart);

      if (userCart) {
        let productExists: Product | undefined = userCart?.product.find(
          (p) => p.id === productId
        );

        if (productExists) {
          let newCart: Product[] = [];
          for (let product of userCart?.product!) {
            if (product.id === productId) {
              if (operation === '+')
                newCart.push({ ...product, count: product.count! + 1 });
              else newCart.push({ ...product, count: product.count! - 1 });
            } else {
              newCart.push(product);
            }
          }
          userCart.product = newCart;
        } else {
          userCart?.product.push({ ...product, count: 1 });
        }

        let updatedCart: Cart[] = cart.filter(
          (c) => c.user.id !== loggedInUser.id
        );
        updatedCart.push(userCart);
        this.storageservice.setCart(updatedCart);
      } else {
        let newCart: Cart = {
          user: loggedInUser,
          product: [{ ...product, count: 1 }],
        };
        cart.push(newCart);
        this.storageservice.setCart(cart);
      }
    }
  }

  getUserCart(): Product[] {
    let loggedInUser: Users = this.storageservice.getLoggedInUser();
    let cart: Cart[] = this.storageservice.getCart();

    let userCart: Product[] | undefined = cart.find(
      (c) => c.user.id === loggedInUser.id
    )?.product;

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

  checkout(): void {
    let loggedInUser: Users = this.storageservice.getLoggedInUser();
    let cart: Cart[] = this.storageservice.getCart();

    this.storageservice.setCart(
      cart.filter((c) => c.user.id !== loggedInUser.id)
    );
  }

  getProductCartCount(id: number): number {
    let cart = this.storageservice.getCart();
    let user = this.authservice.getLoggedInUser();

    let userCart: Product[] | undefined = cart.find(
      (c) => c.user.id === user.id
    )?.product;

    let count: number = 0;
    if (userCart) {
      if (userCart.find((cart) => cart.id === id))
        count = userCart.find((cart) => cart.id === id)?.count!;
    }

    console.log(`id => ${count}`);

    return count;
  }
}


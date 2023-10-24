import { Injectable } from '@angular/core';
import { StorageserviceService } from './storageservice.service';
import { Product } from '../model/product';
import { Users } from '../model/users';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private storageservice: StorageserviceService) {}
  getOrder(): Product[] {
    let loggedUser: Users = this.storageservice.getLoggedInUser();
    let order: Order[] = this.storageservice.();
    console.log(order);

    let userCart: Order | undefined = order.find(
      (cartItem) => cartItem.user.id === loggedUser.id
    );
    console.log(userCart);
    userCart;
    if (!userCart) {
      return [];
    }
    return userCart.cart;
  }
}

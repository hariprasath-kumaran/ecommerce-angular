import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { StorageserviceService } from 'src/app/services/storageservice.service';




@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  cartProducts: Product[]=[];
  constructor(
    private cartservice: CartService,
    private storageservice:StorageserviceService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.cartservice.getUserCart();
  }


  getTotal(): number {
    return this.cartservice.getTotal();
  }

}

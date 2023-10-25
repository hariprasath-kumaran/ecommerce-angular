import { Product } from './product';
import { Users } from './users';

export interface Cart {
  user: Users;
  cart: Product[];
}

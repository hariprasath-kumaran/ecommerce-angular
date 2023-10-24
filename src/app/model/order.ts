import { Product } from "./product";
import { Users } from "./users";

export interface Order {
    user:Users
    cart:Product[]
}

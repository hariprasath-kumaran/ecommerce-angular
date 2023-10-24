import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authtenticateGuard } from './common/authtenticate.guard';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'cart',component:CartComponent, canActivate:[authtenticateGuard]},
  {path:'orders',component:OrdersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

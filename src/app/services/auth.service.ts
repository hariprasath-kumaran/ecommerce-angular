import { Injectable } from '@angular/core';
import { StorageserviceService } from './storageservice.service';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageservice: StorageserviceService) {}
  Validuser(user: Users): boolean {
    let users: Users[] = this.storageservice.getAllUsers();
    let userval: boolean = true;
    for (let u of users) {
      if (u.email === user.email && u.password === user.password) {
        this.storageservice.getLoggedInUser();
        userval = true;
        
      }
    }
    
    return userval;

    }
    islogin():boolean{
       return this.storageservice.isUserLoggedIn()
    }
    islogoutuser(){
      this.storageservice.removeLoggedInUser()
    }
    getLoggedInUser():Users{
      return this.storageservice.getLoggedInUser();
    }

  }
  


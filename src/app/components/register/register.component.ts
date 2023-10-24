import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageserviceService } from 'src/app/services/storageservice.service';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
 
})
export class RegisterComponent {
  constructor(private storageservice:StorageserviceService,private router:Router){}
  onsubmit(RegisterForm:NgForm){
  this.storageservice.setUser(RegisterForm.value);
this.router.navigate(['login'],{replaceUrl:true})

  }

}

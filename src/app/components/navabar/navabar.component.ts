import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageserviceService } from 'src/app/services/storageservice.service';

@Component({
  selector: 'navabar',
  templateUrl: './navabar.component.html',

})
export class NavabarComponent {

  constructor(private authservice:AuthService,private router:Router){}
  islogout(){
    this.authservice.islogoutuser()
    this.router.navigate(['/login'],{replaceUrl:true})
  }
}

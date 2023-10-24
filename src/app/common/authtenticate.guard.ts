import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authtenticateGuard: CanActivateFn = (route, state) => {
  const authservice: AuthService = inject(AuthService);
    const router:Router=inject(Router);
    if(authservice.islogin()){
      return true
    }
    router.navigate(['login'])
    return false
};

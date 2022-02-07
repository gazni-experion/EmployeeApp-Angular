import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //Create a constructor
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot): boolean {
    //Check roles : current role V/S expected role
    //  current role can be get from local storage        expected role can be get from app-routing.module.ts
    const expectedRole = next.data.expectedRole;
    const currentRole = localStorage.getItem('ACCESSROLE');
    // if (expectedRole != currentRole) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    expectedRole == currentRole ? true : this.router.navigate(['/login']);
    return true;
  }
  
}

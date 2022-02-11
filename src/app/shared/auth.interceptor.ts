import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("Intercepting request............");

    //Getting and storing token from storage
    let token = sessionStorage.getItem('JwtTOKEN');

    if (
      sessionStorage.getItem('USERNAME') &&
      sessionStorage.getItem('JwtTOKEN')
    ) {
      request = request.clone({

        //Set the header for the request
        setHeaders: {
          Authorization: `Bearer ${token}`
        }

        
        
      });
    }
    
    return next.handle(request);
  }
}

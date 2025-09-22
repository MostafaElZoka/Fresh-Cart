import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../Environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId:object ,private _httpclient:HttpClient, private _router:Router) { }

  private LoggedIn = new BehaviorSubject<boolean>(this.checkLogin());
  currentLoggedIn$ = this.LoggedIn.asObservable();
  
  setLoggedIn(value:boolean)
  {
    this.LoggedIn.next(value);
  }
  // isloggedIn:boolean = false; //to track user login status

  userDate:any//to store decoded user data from token

  register(formData:any):Observable<any>
  {
    return this._httpclient.post(`${environment.baseUrl}/api/v1/auth/signup`,formData)
  }

    login(formData:any):Observable<any>
  {
    return this._httpclient.post(`${environment.baseUrl}/api/v1/auth/signin`,formData)
  }

  decodeToken()
  {
    if(isPlatformBrowser(this.platformId))//to make sure this code runs only in browser and not in server
    {
      const token = localStorage.getItem("userToken");
      if(token !== null)
      {
        this.userDate = jwtDecode(token);
        console.log(this.userDate);
      }
    }
  }

  checkLogin():any
  {
    if(isPlatformBrowser(this.platformId))//to make sure this code runs only in browser and not in server
    {
      const token = localStorage.getItem("userToken");
      if(token !== null)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else{
     return true;
    }
    
  }

  logout():void
  {
    // if(isPlatformBrowser(this.platformId))//to make sure this code runs only in browser and not in server
    // {
      localStorage.removeItem("userToken");
      this.setLoggedIn(false);
      this.userDate = null;
      this._router.navigate(['/login']);
    // }
    console.log("logout");
    

  }

  verifyEmail(data:any):Observable<any>
  {
    return this._httpclient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }

  verifyOTP(data:any):Observable<any>
  {
    return this._httpclient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }

  resetPassword(data:any):Observable<any>
  {
    return this._httpclient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}

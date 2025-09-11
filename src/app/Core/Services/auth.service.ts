import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpclient:HttpClient) { }

  register(formData:any):Observable<any>
  {
    return this._httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formData)
  }

    login(formData:any):Observable<any>
  {
    return this._httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',formData)
  }
}

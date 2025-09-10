import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpclient:HttpClient) { }

  register(formData:any)
  {
    return this._httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formData)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpclient:HttpClient) { }

  userDate:any
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
    let token = localStorage.getItem("userToken");
    if(token !== null)
    {
      this.userDate = jwtDecode(token);
      console.log(this.userDate);
    }
  }
}

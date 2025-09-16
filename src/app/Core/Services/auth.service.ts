import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpclient:HttpClient) { }

  register(formData:any):Observable<any>
  {
    return this._httpclient.post(`${environment.baseUrl}/api/v1/auth/signup`,formData)
  }

    login(formData:any):Observable<any>
  {
    return this._httpclient.post(`${environment.baseUrl}/api/v1/auth/signin`,formData)
  }
}

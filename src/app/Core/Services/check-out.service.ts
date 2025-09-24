import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private _httpClient:HttpClient,private _authService:AuthService) { }
                
  myHeaders = {'token': localStorage.getItem("userToken") || ''};
  userId:any
  checkout(cartId:string, details:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.serverUrl}`,
      details,
      {
        headers: this.myHeaders
      })
  }

  getUserOrderes():Observable<any>{
    this._authService.decodeToken();
    this.userId = this._authService.userData.id
    return this._httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${this.userId}`,
      {
        headers: this.myHeaders
      }
    );
  }
}

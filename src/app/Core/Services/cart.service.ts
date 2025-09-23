import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _httpClient:HttpClient) { }
  myHeaders = {
    headers: {
      'token': localStorage.getItem("userToken") || ''
    }
  }
  addItemToCart(id:string):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        productId:id
      },
    {
      headers: this.myHeaders.headers
    })
  }
}

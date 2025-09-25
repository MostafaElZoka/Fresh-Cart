import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _httpClient:HttpClient) { }

  getAllBrands():Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }
}

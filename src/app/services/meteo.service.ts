import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  constructor(private http:HttpClient) { }

  obterPrevisao(lat:number, lng:number) {
    let url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`
    return this.http.get(url);
  }
}

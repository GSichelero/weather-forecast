import { Component, OnInit } from '@angular/core';
import { MeteoService } from 'src/app/services/meteo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public urlImagem;
  public airTemp: number = 0;
  public twelvehoursPrev: string = "not found";
  public twentyfourhoursPrev: string = "not found";

  constructor(public meteoService:MeteoService) { }

  async ngOnInit() {
    let posicao: any = await this.getCurrentPosition();
    this.atualizar(posicao.lat, posicao.lng);
   
  }

  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lat: resp.coords.latitude, lng: resp.coords.longitude });
      },
        err => {
          reject(err);
        });
      })
  }

  async atualizar(lat: number = 0, lon: number = 0) {

    this.meteoService.obterPrevisao(lat, lon).subscribe((previsao: any) => {
        console.log(previsao);
        this.airTemp = previsao.properties.timeseries[0].data.instant.details.air_temperature;
        this.twelvehoursPrev = previsao.properties.timeseries[0].data.next_12_hours.summary.symbol_code;
        this.twentyfourhoursPrev = previsao.properties.timeseries[11].data.next_12_hours.summary.symbol_code;
    });
  }

}

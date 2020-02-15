
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from '../models/car';
import { ImageInfo } from '../models/imageInfo';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  carDetailsUrl = 'http://localhost:8082/carDetails/all';
  carImagesUrl = '../../assets/imageInfo.json';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get(this.carDetailsUrl).pipe(map((res: Car[]) => {
      console.log(res);
      return res;
    }));
  }

  getCarImages(): Observable<ImageInfo[]> {
    return this.http.get(this.carImagesUrl).pipe(map((res: ImageInfo[]) => {
      console.log(res);
      return res;
    }));
  }

  deleteCar(carId: number){
    return this.http.delete('http://localhost:8082/carDetails/removeCarDetails/'+ carId,{responseType:'json'});
  }
}



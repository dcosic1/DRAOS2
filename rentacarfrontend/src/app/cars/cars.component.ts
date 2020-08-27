import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car';
import { CarService } from '../shared/car.service';
import { LocalStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
message: string;

  cars: Car[] = [];
  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getCars().subscribe(
      cars => {
        this.cars = cars;
      });
  }

  sortByName() {
    this.cars.sort(function (a, b) {
      if (a.brand < b.brand) { return -1; }
      if (a.brand > b.brand) { return 1; }
      return 0;
    });
  }

  sortByPrice(type: string) {
    if (type === 'asc') {
      this.cars.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    if (type === 'desc') {
      this.cars.sort((a, b) => a.pricePerDay - b.pricePerDay);
    }
  }

  sortByCarYear() {
    this.cars.sort((a, b) => b.year - a.year);
  }

}

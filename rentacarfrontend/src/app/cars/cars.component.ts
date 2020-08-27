import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car';
import { CarService } from '../shared/car.service';
import { FilterCriteria } from '../models/filter-criteria.model';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  message: string;

  cars: Car[] = [];
  carsList: Car[] = [];
  filteredCars: Car[] = [];
  paginationConfig: any;
  filterCriteria: FilterCriteria = new FilterCriteria();
  carsType = ['Mercedes', 'Audi', 'Toyota', 'Volkswagen', 'Hyundai'];
  constructor(private carService: CarService) {
    this.filterCriteria.searchCriteria = '';
  }

  ngOnInit() {
    this.carService.getCars().subscribe(
      cars => {
        this.cars = cars;
        this.carsList = cars;
        if (cars) {
          this.paginationConfig = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.carsList.length
          };
        }
      });
  }

  pageChanged(event) {
    this.paginationConfig.currentPage = event;
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
  onFilter() {
    if (this.cars) {
      if (!this.filterCriteria.searchCriteria) {
        this.carsList = this.cars;
      } else {
        this.carsList = this.cars.filter(x => !x.brand.search(this.filterCriteria.searchCriteria));
      }
    }
  }

  onCarTypeChange($event:any) {
    if($event.target.checked) {
      this.cars.forEach(car => {
       if(car.brand === $event.target.id ) {
        this.filteredCars.push(car);
       }
      });
    this.carsList = this.filteredCars
    } else {
      this.filteredCars = this.filteredCars.filter(x => x.brand !==  $event.target.id); 
      if(!this.filteredCars.length){
        this.carsList = this.cars;
      } else {
        this.carsList = this.filteredCars
      }
    }
  }

  onSliderChange() {
    console.log(this.filterCriteria.slider);
  }
}

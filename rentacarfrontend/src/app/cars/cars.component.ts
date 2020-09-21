import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car';
import { CarService } from '../shared/car.service';
import { FilterCriteria } from '../models/filter-criteria.model';
import { ActivatedRoute } from '@angular/router';


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
  radioButton: string;
  carsBrand = ['Mercedes', 'Audi', 'Toyota', 'Volkswagen', 'Hyundai'];
  carsType = ['All types','Coupe', 'Sedan', 'SUV', 'Cabriolet', 'Minivan'];

  queryParams: any;
  constructor(private carService: CarService, private route: ActivatedRoute) {
    this.filterCriteria.searchCriteria = '';
  }

  ngOnInit() {

    this.carService.getCars().subscribe(
      cars => {
        this.cars = cars;
        this.route.queryParams.subscribe(q=> {
          if(q){ 
           cars.forEach(c => {
           if(c.reserved ) {
             if(c.reserved.find(reserved => 
             q['startDate'] > reserved[0] && q['endDate'] > reserved[1] || 
             q['startDate'] < reserved[0] && q['endDate'] < reserved[1] 
             )){
              this.carsList.push(c);
             }
           } else {
            this.carsList.push(c);
           }
           });
            if(q['brand'] == 'All brands' && q['type'] == 'All types') {
              this.carsList = this.carsList;
            } else if(q['brand'] == 'All brands' && q['type'] !== 'All types') {
              this.carsList = this.carsList.filter(c => c.carType === q['type'])
            } else if(q['brand'] !== 'All brands' && q['type'] == 'All types') {
              this.carsList = this.carsList.filter(c => c.brand === q['brand'])
            } else if(q['brand'] !== 'All brands' && q['type'] !== 'All types') {
              this.carsList = this.carsList.filter(c => c.brand === q['brand'] && c.carType === q['type'])
            }  
            this.cars = this.carsList;  
          } else {
            this.carsList = cars;
            this.cars = this.carsList;
          }
        })
        if (cars) {
          this.paginationConfig = {
            itemsPerPage: 4,
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
    this.carsList.sort(function (a, b) {
      if (a.brand < b.brand) { return -1; }
      if (a.brand > b.brand) { return 1; }
      return 0;
    });
  }

  sortByPrice(type: string) {
    if (type === 'asc') {
      this.carsList.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    if (type === 'desc') {
      this.carsList.sort((a, b) => a.pricePerDay - b.pricePerDay);
    }
  }

  sortByCarYear() {
    this.carsList.sort((a, b) => b.year - a.year);
  }
  onSearch() {
    if (this.cars) {
      if (!this.filterCriteria.searchCriteria) {
        this.carsList = this.cars;
      } else {
        this.carsList = this.cars.filter(x => !x.brand.search(this.filterCriteria.searchCriteria));
      }
    }
  }

  onCarBrandChange($event:any) {
    if($event.target.checked) {
      this.cars.forEach(car => {
        if(this.radioButton) {
          if(car.brand === $event.target.id && car.carType === this.radioButton) {
            this.filteredCars.push(car);
           }
        } else {
          if(car.brand === $event.target.id ) {
            this.filteredCars.push(car);
           }
        }
      });
    this.carsList = this.filteredCars
    } else {
      if(this.radioButton) {
        this.filteredCars = this.filteredCars.filter(x => x.brand !==  $event.target.id && x.carType === this.radioButton);
          if(!this.filteredCars.length){
            this.carsList = this.cars.filter(c => c.carType=== this.radioButton);
          
          } else {
            this.carsList = this.filteredCars;
          }
      } else {
      this.filteredCars = this.filteredCars.filter(x => x.brand !==  $event.target.id); 
      if(!this.filteredCars.length){
        this.carsList = this.cars;
      } else {
        this.carsList = this.filteredCars
      }
      }
    }
  }

  onCarTypeChange($event) {
    this.radioButton = $event.target.id
    if($event.target.id === this.carsType[0]){
      this.radioButton = ''
        this.carsList = this.cars;
    } else {
      this.carsList = this.cars.filter(c=> c.carType == $event.target.id);
    }
  }

  filterByPrice() {
    const listCar = this.carsList;
    this.carsList = listCar.filter(c=> c.pricePerDay >= this.filterCriteria.minPrice && c.pricePerDay <= this.filterCriteria.maxPrice);
    
  }
}

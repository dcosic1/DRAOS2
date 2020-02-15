import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Car } from '../models/car';
import { CarModel } from '../models/carModel';
import { Reservation } from '../models/reservation';
import { CarService } from '../shared/car.service';
import { ReservationService } from '../shared/reservation.service';
import { first } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  admin: boolean;
  carModels: CarModel[];
  message: string;

  // Update to be array of type Car
  cars: Car[] = [];
  carImagesInfo: any[] = [];

  // Modal info
  modalRef: BsModalRef;
  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  currentCar: Car;
  dateRange: any[] = [];
  dateValid = false;

  carName: string; // carName should be equal to carBrand_carModel
  carDescription: string;
  carYear: number;
  pricePerDay: number;
  totalPrice: number;
  imageUrl: any[] = [];

  // Reservation service info
  public reservationInfo: Reservation;
  http: any;


  constructor(private localStorage: LocalStorageService, private modalService: BsModalService, private reservationService: ReservationService, private router: Router, private carService: CarService) { }

  ngOnInit() {
    this.carService.getCarImages().subscribe(imageInfos => this.carImagesInfo = imageInfos);
    this.carService.getCars().subscribe(
      cars => {
        this.cars = cars;
        this.mapImagesForCars();
      });
    this.mockDataForFrontEnd();
    this.currentCar = new Car();
    this.reservationInfo = new Reservation();
    // Config for datepicker
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.rangeInputFormat = 'YYYY/MM/DD';
    // Passing data between components
    // this.reservationService.currentReservation.subscribe(reservationInfo => this.reservationInfo = reservationInfo)
    this.admin = this.localStorage.get("role");


    this.reservationService.currentMessage.subscribe(message => this.reservationInfo = message);
  }

  openModal(modalCarDetails: TemplateRef<any>, currentCar: Car) {
    this.modalRef = this.modalService.show(modalCarDetails);
    this.setModalData(currentCar);
    console.log(currentCar);
  }

  mapImagesForCars() {
    this.cars.forEach(car => {
      let temp = new Car();
      temp = car;
      temp.imgUrls = [];
      for (let imageInfo of this.carImagesInfo) {
        if (imageInfo.carId === car.id) {
          temp.imgUrls.push(imageInfo.imageUrl);
          console.log("mapImages: " + car);
        }
      }
    });

  }

  setModalData(currentCar: Car) {
    this.currentCar.id = currentCar.id;
    this.currentCar.brand = currentCar.brand;
    this.currentCar.model = currentCar.model;
    this.currentCar.description = currentCar.description;
    this.currentCar.year = currentCar.year;
    this.currentCar.carType = currentCar.carType;
    this.currentCar.pricePerDay = currentCar.pricePerDay;
    this.totalPrice = 0;
    this.currentCar.imgUrls = currentCar.imgUrls;
  }

  onValueChange(event: any) {
    if (typeof this.dateRange !== 'undefined') {
      this.dateValid = true;
      this.dateRange[0] = event[0];
      this.dateRange[1] = event[1];
      return;
    }
    this.dateValid = false;
    console.log("CHANGE HAPPENED: " + event + " *** Date range: " + this.dateRange + " Date is valid: " + this.dateValid);
  }

  onCreateReservation() {
    this.reservationInfo.id = 0;
    this.reservationInfo.car = this.currentCar;
    this.reservationInfo.isRental = false;
    this.reservationInfo.startDate = this.dateRange[0];
    this.reservationInfo.endDate = this.dateRange[1];
    this.reservationInfo.totalPrice = this.calculateTotalPrice(this.getNumberOfDays(this.reservationInfo.startDate, this.reservationInfo.endDate), this.currentCar);
    this.reservationService.onReservationSelected(this.reservationInfo);
    this.modalRef.hide();
    this.router.navigate(['payment']);

    this.reservationService.changeMessage(this.reservationInfo);
  }

  calculateTotalPrice(numberOfDays: number, car: Car) {
    // Maybe add more business logic
    return numberOfDays * car.pricePerDay;
  }

  getNumberOfDays(startDate: Date, endDate: Date) {
    var date1 = startDate;
    var date2 = endDate;
    var diffTime = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    console.log(diffDays);
    return (diffDays);
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

  deleteCar(carId) {
    this.carService.deleteCar(carId).pipe(first()).subscribe(data => { console.log("user deleted"); });

    for (let i = 0; i < this.cars.length; ++i) {
      if (this.cars[i].id === carId) {
        this.cars.splice(i, 1);
      }
    }
  }

  //Mocking data

  mockDataForFrontEnd() {
    var car1 = new Car();
    var car2 = new Car();
    car1.imgUrls = [];
    car2.imgUrls = [];

    car1.brand = "Mercedes";
    car1.model = "S Class";
    car1.description = "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.";
    car1.pricePerDay = 200;
    car1.year = 2018;
    car1.carType = "Luxury Sedan";
    car1.imgUrls.push("../../assets/images/cars/mercedessclass.jpg");

    car2.brand = "Audi";
    car2.model = "A6";
    car2.description = "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.";
    car2.pricePerDay = 200;
    car2.year = 2018;
    car2.carType = "Luxury sedan";
    car2.imgUrls.push("../../assets/images/cars/audia6.jpg");
    car2.imgUrls.push("../../assets/images/cars/audia62.jpg");

    this.cars.push(car1);
    this.cars.push(car2);
  }




}

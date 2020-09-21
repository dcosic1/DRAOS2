import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Car } from 'src/app/models/car';
import { BsModalService, BsModalRef, BsDatepickerConfig } from 'ngx-bootstrap';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/shared/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-component',
  templateUrl: './car-component.component.html',
  styleUrls: ['./car-component.component.css']
})
export class CarComponentComponent implements OnInit {

  constructor(private modalService: BsModalService, private reservationService: ReservationService, private router: Router) { }
  @Input() car: Car;
  @Input() startDate?: Date;
  @Input() endDate?: Date;
  modalRef: BsModalRef;
  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  dateRange: any[] = [];
  dateValid = false;
  totalPrice: number;
  disabledDates: Date[] = [];
  reservationInfo: Reservation;

  ngOnInit() {
    // Config for datepicker
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.rangeInputFormat = 'YYYY/MM/DD';
    this.dpConfig.minDate= new Date();
    this.dpConfig.showWeekNumbers = false;
    this.reservationInfo = new Reservation();
    if(this.car.reserved) {
      this.car.reserved.forEach(element => {
        const startDate = new Date(element[0]);
        const endDate = new Date(element[1]);
        while(startDate <= endDate) {
          this.disabledDates.push(new Date(startDate));
          startDate.setDate(startDate.getDate()+1);
        }
      });
      this.dpConfig.datesDisabled = this.disabledDates;
    }
  }
  openModal(modalCarDetails: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalCarDetails);
    if(this.startDate && this.endDate){
      this.dpConfig.value = [this.startDate, this.endDate];
    }
    console.log(this.car);
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
    this.reservationInfo.car = this.car;
    this.reservationInfo.isRental = false;
    this.reservationInfo.startDate = this.dateRange[0];
    this.reservationInfo.endDate = this.dateRange[1];
    this.reservationInfo.totalPrice = this.calculateTotalPrice(this.getNumberOfDays(this.reservationInfo.startDate, this.reservationInfo.endDate));
    this.reservationService.onReservationSelected(this.reservationInfo);    
    this.modalRef.hide();
    this.router.navigate(['payment']);
  }

  onRentCar() {
    this.reservationInfo.id = 0;
    this.reservationInfo.car = this.car;
    this.reservationInfo.isRental = true;
    this.reservationInfo.startDate = this.dateRange[0];
    this.reservationInfo.endDate = this.dateRange[1];
    var numberOfDays = this.getNumberOfDays(this.reservationInfo.startDate, this.reservationInfo.endDate);
    this.reservationInfo.totalPrice = this.calculateTotalPrice(numberOfDays);
    this.reservationService.onReservationSelected(this.reservationInfo);
    this.modalRef.hide();
  }

  calculateTotalPrice(numberOfDays: number) {
    // Maybe add more business logic
    return numberOfDays * this.car.pricePerDay;
  }
    
  getNumberOfDays(startDate: Date, endDate: Date) {
    var date1 = startDate;
    var date2 = endDate;
    var diffTime = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    console.log(diffDays);
    return (diffDays);
  }
}

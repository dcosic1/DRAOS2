import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../shared/reservation.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  tabTitle = "Reservation";

  reservationInfo: Reservation;
  reservationExists = false;

  constructor(private reservationService: ReservationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.reservationInfo = this.reservationService.reservationInfo;
    this.validateBooking(this.reservationInfo);
  }

  validateBooking(reservation: Reservation) {
    if (typeof reservation === 'undefined') {
      this.reservationExists = false;
      return;
    }
    if (reservation.isRental) {
      this.tabTitle = "Rental";
    }
    this.reservationExists = true;
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  onConfirmClick() {
    this.reservationService.createReservation();
  }

}

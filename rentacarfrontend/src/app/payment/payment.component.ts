import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  reservation = new Reservation();

  price: number = 0;

  message: string;

  constructor(private service: ReservationService) {
    
  }

  ngOnInit() {
    this.service.currentMessage.subscribe(message => this.reservation = message);
    this.price = this.reservation.totalPrice;
  }

}

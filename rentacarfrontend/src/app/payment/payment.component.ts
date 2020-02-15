import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../models/reservation';
import swal from 'sweetalert2'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  reservation = new Reservation();

  price: number = 0;

  message: string;

  constructor(private service: ReservationService, private router: Router) {

  }

  ngOnInit() {
    this.service.currentMessage.subscribe(message => this.reservation = message);
    this.price = this.reservation.totalPrice;

    
  }

  confirm(event) {
    swal.fire({
      icon: "success",
      title: "Success",
      text: "Reservation placed"
    }).then(() => {this.router.navigate(["home"])});
  }

}

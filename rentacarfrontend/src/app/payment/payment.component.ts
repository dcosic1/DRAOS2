import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../models/reservation';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { format } from 'url';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { timer } from 'rxjs';
import { CarService } from '../shared/car.service';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  reservation = new Reservation();
  price: number = 0;

  angForm: FormGroup;
  submitted = false;


  constructor(private service: ReservationService, private router: Router, private fb: FormBuilder,private carService: CarService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      cardName: ['', Validators.required],
      ccNumber: ['', Validators.required],
      ccExpiration: ['', Validators.required],
      ccv: ['', Validators.required],
    });
    this.angForm.controls["ccNumber"].setValidators([Validators.minLength(16), Validators.maxLength(16)]);
  }

  get f() { return this.angForm.controls; }

  ngOnInit() {
    this.service.currentMessage.subscribe(message => this.reservation = message);
    this.price = this.reservation.totalPrice;
  }

  onSubmit() {
    this.submitted = true;

    if (this.angForm.valid) {
      swal.fire({
        icon: "success",
        title: "Success",
        text: "Reservation placed"
      }).then(() => { this.router.navigate(["home"]) });

      this.generatePdf();

      this.carService.getCars().subscribe(
        cars => {
          cars.map( c => c.carId === this.reservation.car.carId ? {
            ...c,
           reserved: c.reserved.push([this.reservation.startDate, this.reservation.endDate])
          }: c)
          
    console.log(cars)
        }
        );
        
    }
  }

   generatePdf() {
    var element = document.createElement('element');
    element.innerText ='20';

html2canvas(element).then((canvas) => {
    let imgData = canvas.toDataURL('image/png');

    let imgWidth = 208,
        
        imgHeight = canvas.height * imgWidth / canvas.width,
        pageHeight = imgHeight,
        heightLeft = imgHeight,
        doc = new jsPDF('l', 'mm', 'a4'),
        position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

    doc.save( 'newpdf'+'.pdf');
});
  }
}
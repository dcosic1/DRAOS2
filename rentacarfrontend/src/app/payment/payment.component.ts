import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../models/reservation';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { format } from 'url';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


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


  constructor(private service: ReservationService, private router: Router, private fb: FormBuilder) {
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
    }
  }

  generatePdf() {
    var data = document.getElementById('receipt');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('../../assets/receipts/image.png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }
}
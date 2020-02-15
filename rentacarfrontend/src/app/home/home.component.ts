import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides: any[];

  constructor() { }

  ngOnInit() {
    this.slides = [
      {
        "title": "Audi A6",
        "description": "Default desc",
        "imgUrl": "../../assets/images/cars/audia6.jpg"
      },
      {
        "title": "Mercedes S Class",
        "description": "Default desc",
        "imgUrl": "../../assets/images/cars/mercedessclass.jpg"
      },
      {
        "title": "BMW X5",
        "description": "Default desc",
        "imgUrl": "../../assets/images/cars/bmwx5.jpg"
      },
      {
        "title": "Volvo XC40",
        "description": "Default desc",
        "imgUrl": "../../assets/images/cars/volvoxc40.jpg"
      }
    ];
  }

}

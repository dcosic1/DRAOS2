import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides: any[];
  dateRange: any[] = [];
  dateValid = false;
  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor() { }

  ngOnInit() {
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.rangeInputFormat = 'YYYY/MM/DD';
    this.dpConfig.minDate= new Date();
    this.dpConfig.showWeekNumbers = false;
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

}

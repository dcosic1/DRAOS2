import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { FilterCriteria } from '../models/filter-criteria.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  filterCriteria: FilterCriteria = new FilterCriteria();
  carsBrand = ['All brands', 'Mercedes', 'Audi', 'BMW', 'Volkswagen', 'Lexus'];
  carsType = ['All types','Coupe', 'Sedan', 'SUV', 'Cabriolet', 'Caravan'];
  angForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) { }


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

      this.angForm = this.fb.group({
        dateForm: ['', Validators.required],
        brandForm: new FormControl(''),
        typeForm: new FormControl('')
      });
      
    this.angForm.controls.brandForm.setValue(this.carsBrand[0]);
    this.angForm.controls.typeForm.setValue(this.carsType[0]);
    this.filterCriteria.type = this.carsType[0];
    this.filterCriteria.brand = this.carsBrand[0];

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

  searchForCars() {
    console.log(this.dateRange);
    this.router.navigate(['/cars'], { queryParams: { startDate: this.dateRange[0].toISOString(), endDate: this.dateRange[1].toISOString(), type: this.filterCriteria.type, brand: this.filterCriteria.brand}});
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import {RegistrationComponent} from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BookingComponent } from './booking/booking.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './contact/contact.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularWebStorageModule } from 'angular-web-storage';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaymentComponent } from './payment/payment.component';
import { CarComponentComponent } from './cars/car-component/car-component.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarsComponent,
    HelpComponent,
    BookingComponent,
    ContactComponent,
    RegistrationComponent,
    ManageUsersComponent,
    PaymentComponent,
    CarComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    AngularFontAwesomeModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    AngularWebStorageModule,
    BsDropdownModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }





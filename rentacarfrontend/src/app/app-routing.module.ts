import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { CarsComponent } from './cars/cars.component';
import { ContactComponent } from './contact/contact.component';
import { AdminGuard } from './guards/adminGuard';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RegistrationComponent } from './registration/registration.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'cars',
    component: CarsComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'manageUsers',
    component: ManageUsersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

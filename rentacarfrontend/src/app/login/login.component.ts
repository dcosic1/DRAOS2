import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { User } from '../models/user';
import { TestObject } from 'protractor/built/driverProviders';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private userService: UserService) { }

  get f() { return this.loginForm.controls; }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.f.username.value).subscribe((result: User)=> {
      if(result == null){
        window.alert("Invalid credentials.");
        return;
      }
      else{
        this.user = result;
        if(this.user.password == this.f.password.value){
          if(this.user.role == "admin"){
            this.userService.setRole("admin");
          }
          else{
            this.userService.setRole("client");
          }
          this.userService.setLoggedIn(true);
         this.router.navigate(['/home']);
        }
        else{
          window.alert("Invalid credentials.");
          return;
        }
      }
     
      
    });
    //ovo je nesto oko autorizacije zerinine
   /* const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.apiService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      console.log(window.sessionStorage.getItem('token'));
      this.router.navigate(['list-user']);
    }, error => {
        alert(error.error.error_description)
    });*/
  }

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }
}

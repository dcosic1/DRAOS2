import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { User } from '../models/user';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user:  User;
  userDetail: User;
  users : User [] ;
  userDetails: User[];
  

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.setRegisterForm();
     this.getAllUsers();
     this.getAllUserDetails();
   
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      this.loading=true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        this.loading=false;
          return;
      }
     
      if(!this.checkMail() || !this.checkUsername()){
        this.loading=false;
        return;
      }
      
      this.loading = true;
      this.user = new User();
      this.user.username=this.f.username.value;
      this.user.password=this.f.password.value;
      this.user.role="client";
     
      this.userDetail=new User();
      this.userDetail.firstname=this.f.firstName.value;
      this.userDetail.lastname=this.f.lastName.value;
      this.userDetail.email=this.f.email.value;
      this.userDetail.username=this.f.username.value;
      this.userDetail.verified= 1;

      this.userService.addUserDetails(this.userDetail).pipe(first()).subscribe(data => {console.log("details added");});

      this.userService.createUser(this.user).pipe(first()).subscribe(data => { console.log("user added");
                window.alert("User successfully created") });

  this.getAllUserDetails();
  this.getAllUsers();
  this.loading= false;
  this.setRegisterForm();
  this.submitted=false;
}

checkUsername(){
  for(var i=0; i <this.users.length; i++){
    if(this.users[i].username == this.f.username.value){
    window.alert("User with entered username already exists.");
    return false;
    }
  }
  return true;
}

checkMail(){
  for(var i =0; i<this.userDetails.length; i++){
    if(this.userDetails[i].email == this.f.email.value){
      window.alert("User with entered email already exists.");
      return false;
    }
  }
  return true;
}
getAllUsers(){
  this.userService.getAllUsers()
  .subscribe((result: Array<User>) => {
  this.users = result});
}
getAllUserDetails(){
  this.userService.getAllUserDetails().subscribe((result: Array<User>)=> {
    this.userDetails = result;
  });
}

setRegisterForm(){
  this.registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
   });
}
}


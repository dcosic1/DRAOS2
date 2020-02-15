import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  admin:string;
  visible : boolean;
  constructor(private localStorage: LocalStorageService,private userService: UserService, private router: Router) {
   }

  ngOnInit() {
    this.userService.loggedIn$.subscribe((loggedIn: boolean) => {
      this.visible = loggedIn;
  });
  this.admin = this.localStorage.get("role");
  
}


logOut() {
this.userService.signOut();
this.visible=false;
}
}

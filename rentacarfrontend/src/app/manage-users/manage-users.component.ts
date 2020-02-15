import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
users: User [];
  constructor(private userService: UserService) { }

  ngOnInit() {

   this.getAllUsers();
   
  }
  deleteUser(userid){
    this.userService.deleteUser(userid).pipe(first()).subscribe(data => {console.log("user deleted");});
  
      for(let i = 0; i < this.users.length; ++i){
          if (this.users[i].id === userid) {
              this.users.splice(i,1);
          }
      }
  }
  
  
  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe((result: Array<User>) => {
      console.log(result);
    this.users = result});
  }
}

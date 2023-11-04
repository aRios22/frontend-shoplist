import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './services/user/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-shoplist';
  constructor(public userService: UserServiceService, public router: Router){}

  logout(){
    this.userService.logout();
    this.router.navigate(['login']);
  }
}

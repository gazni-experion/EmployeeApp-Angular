import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loggedUser: string;

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("USERNAME");
    
  }

  //Logout
  logOut() {
    this.auth.logout();
    this.route.navigateByUrl('login');
  }

}

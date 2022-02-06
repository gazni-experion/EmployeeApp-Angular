import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss']
})
export class CoordinatorComponent implements OnInit {

  loggedUser: string;
  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("USERNAME");
  }

  logOut() {
    this.auth.logout();
    this.route.navigateByUrl('login');
  }

}

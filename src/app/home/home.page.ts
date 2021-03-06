import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  password: string;


  constructor(private router: Router) {}

  signin(){
    this.router.navigate(["signin"]);
  }
  mainpage(){
    this.router.navigate(["home"]);
  }
  about(){
    this.router.navigate(["about"]);
  }
  contact(){
    this.router.navigate(["contact"]);
  }
  services(){
    this.router.navigate(["our-services"]);
  }



}

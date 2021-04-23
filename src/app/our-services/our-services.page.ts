import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.page.html',
  styleUrls: ['./our-services.page.scss'],
})
export class OurServicesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

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

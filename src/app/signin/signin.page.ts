import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  email: string;
  password: string;
  empData: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastController,
    private firebase: FirebaseService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }


  async signin() {

    if (this.email && this.password) {

      const loading = await this.loadingCtrl.create({
        message: 'Loging in...',
        spinner: 'crescent',
        showBackdrop: true
      });

      loading.present();
     
      this.auth.login(this.email, this.password)
        .then(() => {
          loading.dismiss();

        })
        .catch((error) => {
          loading.dismiss();
          this.toast(error.massege, 'danger');
        });

    } else {
     
      this.toast('Please enter your email and password!', 'danger');
    }
  }



  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000
    });
    toast.present();
  }


  mainpage() {
    this.router.navigate(["home"]);
  }
  about() {
    this.router.navigate(["about"]);
  }
  contact() {
    this.router.navigate(["contact"]);
  }
  services() {
    this.router.navigate(["our-services"]);
  }
  signup() {
    this.router.navigate(["signup"]);
  }

}

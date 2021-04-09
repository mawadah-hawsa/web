import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage  {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  

  async signin() {

    if (this.email && this.password) {

      const loading = await this.loadingCtrl.create({
        message: 'Loging in...',
        spinner: 'crescent',
        showBackdrop: true
      });

      loading.present();
      this.auth.login(this.email, this.password)
        .then(()=> {
          
          loading.dismiss();
          this.toast('login success!','success');
          //this.router.navigate(['/profile']);
          //this.router.navigate(["profile"]);
        })
        .catch((error)=> {
          loading.dismiss();
          this.toast(error.massege, 'danger');/////////////////////
        });
        //this.router.navigate(["profile"]);
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
    this.router.navigate(["services"]);
  }
  signup(){
    this.router.navigate(["signup"]);
  }

}

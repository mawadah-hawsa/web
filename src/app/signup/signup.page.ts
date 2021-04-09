import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Console } from 'console';
import { error } from 'protractor';
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  fname: string;
  lname: string;
  nid: string;
  email: string;
  password: string;
  phone:string;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
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

  async signup() {

    if (this.nid && this.email && this.password) {

      const loading = await this.loadingCtrl.create({
        message: 'loading...',
        spinner: 'crescent',
        showBackdrop: true
      });

      loading.present();

      this.afAuth.createUserWithEmailAndPassword(this.email, this.password).then((data) => {
        this.afs.collection('employees').doc(data.user.uid).set({
          'userId' : data.user.uid,
          'fname' : this.fname,
          'lname' : this.lname,
          'nid' : this.nid,
          'phone' : this.phone,
          'email': this.email,
          'password': this.password,
          'createdAt': Date.now()
        });

        data.user.sendEmailVerification();

      })
        .then(() => {
          loading.dismiss();
          this.toast('Registration success!','success');
          this.router.navigate(['/signin']);
        })

        .catch((error) => {
          loading.dismiss();
          this.toast(error.message,'danger');
        })

    } else {
      this.toast('Please fill the form','danger');
    }

  }//eno of "signup" method

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

}

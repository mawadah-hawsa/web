import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  Permits = [];
  doc = [];
  empData: any;
  emp_email: string;

  constructor(
    private firebase: FirebaseService,
    private afauth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private toastr: ToastController,
    private auth: AuthService
    ) { }

    ngOnInit() {

      this.afauth.user.subscribe(res => {
        this.emp_email = res.email;
        this.currentEmp();
      });
  
      this.getPermits();
    }
  
    currentEmp() {
  
      this.firebase.searchEmp(this.emp_email)
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log('Document not found! Try again!');
  
          } else {
            ss.docs.forEach(doc => {
              this.empData = doc.data();
            })
          }
        });
    }
  
  
    getPermits() {
      this.firebase.getdocs()
        .subscribe(result => {
          result.docs.forEach(doc => {
            this.doc.push(doc.id);
          })
  
  
          for (let index = 0; index < this.doc.length; index++) {
            this.firebase.getPermits(this.doc[index]).subscribe(result => {
              result.docs.forEach(doc => {
                this.Permits.push(doc.data());
              })
            });
          }
  
        });
    }
  
    signout() {
      this.auth.logout();
    }
    mainpage() {
      this.router.navigate(["home"]);
    }
    about() {
      this.router.navigate(["about"]);
    }
    info() {
      this.router.navigate(["informations"]);
    }
    permits() {
      this.router.navigate(["permits"]);
    }
    reports() {
      this.router.navigate(["reports"]);
    }
    contact() {
      this.router.navigate(["contact"]);
    }
    services() {
      this.router.navigate(["our-services"]);
    }
    profile(){
      this.router.navigate(["profile"]);
    }
  
    async toast(message, status) {
      const toast = await this.toastr.create({
        message: message,
        position: 'top',
        color: status,
        duration: 3000
      });
      toast.present();
    }
  

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { switchMap } from 'rxjs/operators'
import { FirebaseService } from 'src/app/services/firebase.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  user: User;
  empData: any;

  constructor(
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private firebase: FirebaseService
  ) {

    this.user$ = this.afauth.authState.pipe(switchMap(user => {

      if (user) {
        return this.afs.doc(`employees/${user.uid}`).valueChanges();

      } else {
        return of(null);
      }
    })
    );
  }// end of constructor

  
  async login(email, pass) {

    const loading = await this.loadingCtrl.create({
      message: 'Authenticating...',
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();
    this.afauth.signInWithEmailAndPassword(email, pass).then((data) => {

      if (!data.user.emailVerified) {
        loading.dismiss();
        this.toast('please verify your email!', 'danger');
        this.logout();

      } else {
        loading.dismiss();
        
        this.firebase.searchEmp(email)
          .subscribe(ss => {
            if (ss.docs.length === 0) {
              this.toast('You do not have an account!', 'danger');

            } else {
              this.toast('login success!', 'success');

              ss.docs.forEach(doc => {
                this.empData = doc.data();

                if (this.empData.type == "police") {
                  this.router.navigate(['/police-informations']);
        
                } else {
                  this.router.navigate(['/informations']);
                }
              })
            }
          }); 
      }
    });

  }

  logout() {
    this.afauth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
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

}


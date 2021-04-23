import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['./informations.page.scss'],
})
export class InformationsPage implements OnInit {

  items: Array<any>;
  name_filtered_items: Array<any>;
  email_filtered_items: Array<any>;
  empData: any;
  emp_email: string;
  emp_id: any;
  searchFor:any;
  

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
      this.emp_id = res.uid;
      this.currentEmp();
    }); 

    this.getData();
  }

  currentEmp() {
    
    this.firebase.searchEmp(this.emp_email)
    .subscribe(ss => {
      if (ss.docs.length === 0) {
        console.log('Document not found! Try again!');

      } else {
        ss.docs.forEach(doc => {
          this.empData = doc.data();
          console.log( this.empData.fname);
        })
      }
    });

  }

  searchByName() {
    
    this.firebase.searchUsers(this.searchFor).subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.email_filtered_items);
      })
     if(this.searchFor){
       this.ngOnInit();
     }
  }

  getData() {
    this.firebase.getUsers()
      .subscribe(result => {
        this.items = result;
        this.name_filtered_items = result;
        this.email_filtered_items = result;
      })
  }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

  deletAccount(i){
    this.firebase.deleteUser(this.items[i].payload.doc.id);
    this.toast('The Account Deleted Successfully!','success');
  }

  signout() {
    this.auth.logout();
  }
  mainpage(){
    this.router.navigate(["home"]);
  }
  info(){
    this.router.navigate(["information"]);
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
  permits(){
    this.router.navigate(["permits"]);
  }
  reports() {
    this.router.navigate(["reports"]);
  }
  profile(){
    this.router.navigate(["profile"]);
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

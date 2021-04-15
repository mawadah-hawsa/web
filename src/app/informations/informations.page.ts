import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { DataService, Message } from '../services/data.service';
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
    private data: DataService,
    private afs: AngularFirestore,
    private toastr: ToastController,
    private auth: AuthService
    
  ) { }

  ngOnInit() {
   
    this.afauth.user.subscribe(res => {
      this.emp_email = res.email;
      this.emp_id = res.uid;
      console.log(this.emp_email);
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
  profile(){
    this.router.navigate(["profile"]);
  }


  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  

  deletAccount(i){
    this.firebase.deleteUser(this.items[i].payload.doc.id);
    this.toast('The Account Deleted Successfully!','success');
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

  /*
  calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    var lat = this.toRad(lat1);
    var lat = this.toRad(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat) * Math.cos(lat); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }
  
  toRad(Value) {
    return Value * Math.PI / 180;
  }
*/

}

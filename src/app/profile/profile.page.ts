import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  empData: any;
  item: any;
  emp_email: string;
  emp_id: any;
  emp_nid: any;
  emp_fname: any;
  emp_lname: any;
  emp_phone: any;

  empForm: FormGroup;

  validation_messages = {
    'fname': [
      { type: 'required', message: 'fname is required.' }
    ],
    'lname': [
      { type: 'required', message: 'lname is required.' }
    ],
    'nid': [
      { type: 'required', message: 'national id is required.' },
    ],
    'phone': [
      { type: 'required', message: 'phone is required.' },
    ],
    'email': [
      { type: 'required', message: 'email is required.' },
    ]
  };

  constructor(
    private firebase: FirebaseService,
    private afauth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private toastr: ToastController,
    private fb: FormBuilder,


  ) { }

  ngOnInit() {
    this.afauth.user.subscribe(res => {
      this.firebase.searchEmp(res.email)
        .subscribe(ss => {
          if (ss.docs.length === 0) {
            console.log('Document not found! Try again!');
          } else {
            ss.docs.forEach(doc => {
              this.empData = doc.data();
            })
          }
        });
    });

    this.createForm();
  }


  createForm() {
    this.empForm = this.fb.group({
      fname: [this.emp_fname, Validators.required],
      lname: [this.emp_lname, Validators.required],
      nid: [this.emp_nid, Validators.required],
      email: [this.emp_email, Validators.required],
      phone: [this.emp_phone, Validators.required],
      password: ['']
    });
  }

  onSubmit(value) {
    value.email = this.emp_email;
    value.password = this.empData.password;
    this.firebase.updateEmp(this.emp_id, value)
      .then(
        res => {
          this.router.navigate(['/informations']);
        }
      )
  }
  signout() {
    this.afauth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }
  mainpage() {
    this.router.navigate(["home"]);
  }
  info() {
    this.router.navigate(["informations"]);
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
  permits() {
    this.router.navigate(["permits"]);
  }
  profile() {
    this.router.navigate(["profile"]);
  }

}

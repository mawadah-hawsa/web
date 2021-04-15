import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { pathToFileURL } from 'node:url';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }



  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateEmp(userKey, value) {
    return this.db.collection('employees').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  getPermits(userKey) {
    
    return this.db.collection('permits').doc(userKey).collection('history').get()
  }
  getdocs() {
    return this.db.collection('permits').get()
  }

  searchEmp(searchValue) {
    return this.db.collection('employees', ref => ref.where('email', '==', searchValue)).get()
  }

  searchUsers(searchValue) {
    return this.db.collection('users', ref => ref.where('fname', '<=', searchValue + '\uf8ff').where('fname', '>=', searchValue))
      .snapshotChanges()
  }



}

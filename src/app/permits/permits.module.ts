import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermitsPageRoutingModule } from './permits-routing.module';

import { PermitsPage } from './permits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermitsPageRoutingModule
  ],
  declarations: [PermitsPage]
})
export class PermitsPageModule {}

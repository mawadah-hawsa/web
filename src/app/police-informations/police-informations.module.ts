import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliceInformationsPageRoutingModule } from './police-informations-routing.module';

import { PoliceInformationsPage } from './police-informations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliceInformationsPageRoutingModule
  ],
  declarations: [PoliceInformationsPage]
})
export class PoliceInformationsPageModule {}

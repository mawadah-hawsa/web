import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliceInformationsPage } from './police-informations.page';

const routes: Routes = [
  {
    path: '',
    component: PoliceInformationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliceInformationsPageRoutingModule {}

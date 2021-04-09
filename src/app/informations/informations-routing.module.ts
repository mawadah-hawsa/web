import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationsPage } from './informations.page';

const routes: Routes = [
  {
    path: '',
    component: InformationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationsPageRoutingModule {} 
//24.48554674945883, 39.57568985879837
//.485783068906976, 39.624659812498805

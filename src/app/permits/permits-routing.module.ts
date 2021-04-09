import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermitsPage } from './permits.page';

const routes: Routes = [
  {
    path: '',
    component: PermitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermitsPageRoutingModule {}

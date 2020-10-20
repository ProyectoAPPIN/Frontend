import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticaTratamientoDatosPage } from './politica-tratamiento-datos.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticaTratamientoDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticaTratamientoDatosPageRoutingModule {}

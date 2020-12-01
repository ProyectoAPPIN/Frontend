import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarSintomasPage } from './registrar-sintomas.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarSintomasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarSintomasPageRoutingModule {}

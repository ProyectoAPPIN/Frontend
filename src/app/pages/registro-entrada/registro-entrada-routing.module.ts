import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroEntradaPage } from './registro-entrada.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEntradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroEntradaPageRoutingModule {}

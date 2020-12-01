import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarSintomasPageRoutingModule } from './registrar-sintomas-routing.module';

import { RegistrarSintomasPage } from './registrar-sintomas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarSintomasPageRoutingModule
  ],
  declarations: [RegistrarSintomasPage]
})
export class RegistrarSintomasPageModule {}

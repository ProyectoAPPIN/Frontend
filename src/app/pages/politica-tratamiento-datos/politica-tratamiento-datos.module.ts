import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticaTratamientoDatosPageRoutingModule } from './politica-tratamiento-datos-routing.module';

import { PoliticaTratamientoDatosPage } from './politica-tratamiento-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticaTratamientoDatosPageRoutingModule
  ],
  declarations: [PoliticaTratamientoDatosPage]
})
export class PoliticaTratamientoDatosPageModule {}

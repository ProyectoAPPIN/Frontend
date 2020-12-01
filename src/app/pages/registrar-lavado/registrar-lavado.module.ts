import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarLavadoPageRoutingModule } from './registrar-lavado-routing.module';

import { RegistrarLavadoPage } from './registrar-lavado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarLavadoPageRoutingModule
  ],
  declarations: [RegistrarLavadoPage]
})
export class RegistrarLavadoPageModule {}

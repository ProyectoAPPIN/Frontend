import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEntradaPageRoutingModule } from './registro-entrada-routing.module';

import { RegistroEntradaPage } from './registro-entrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroEntradaPageRoutingModule
  ],
  declarations: [RegistroEntradaPage]
})
export class RegistroEntradaPageModule {}

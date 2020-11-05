import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEntradaPageRoutingModule } from './registro-entrada-routing.module';

import { RegistroEntradaPage } from './registro-entrada.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroEntradaPageRoutingModule
  ],
  providers:  [
    BarcodeScanner,
  ],
  declarations: [RegistroEntradaPage]
})
export class RegistroEntradaPageModule {}

